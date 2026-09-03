"use strict";

// This file should be committed to the repository. It keeps the isolated Nx
// installation synchronized with the version declared in nx.json.
Object.defineProperty(exports, "__esModule", { value: true });

const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const installationPath = path.join(__dirname, 'installation', 'package.json');

function matchesCurrentNxInstall(currentInstallation, nxJsonInstallation) {
  if (
    !currentInstallation.devDependencies ||
    !Object.keys(currentInstallation.devDependencies).length
  ) {
    return false;
  }

  try {
    if (
      currentInstallation.devDependencies['nx'] !==
        nxJsonInstallation.version ||
      require(
        path.join(
          path.dirname(installationPath),
          'node_modules',
          'nx',
          'package.json',
        ),
      ).version !== nxJsonInstallation.version
    ) {
      return false;
    }

    for (const [plugin, desiredVersion] of Object.entries(
      nxJsonInstallation.plugins || {},
    )) {
      if (currentInstallation.devDependencies[plugin] !== desiredVersion) {
        return false;
      }
    }

    return true;
  } catch {
    return false;
  }
}

function ensureDir(directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}

function getCurrentInstallation() {
  try {
    return require(installationPath);
  } catch {
    return {
      name: 'nx-installation',
      version: '0.0.0',
      devDependencies: {},
    };
  }
}

function performInstallation(currentInstallation, nxJson) {
  fs.writeFileSync(
    installationPath,
    JSON.stringify({
      name: 'nx-installation',
      devDependencies: {
        nx: nxJson.installation.version,
        ...nxJson.installation.plugins,
      },
    }),
  );

  try {
    cp.execSync('npm i --include=dev', {
      cwd: path.dirname(installationPath),
      stdio: 'inherit',
      windowsHide: true,
    });
  } catch (error) {
    fs.writeFileSync(
      installationPath,
      JSON.stringify(currentInstallation),
    );
    throw error;
  }
}

function ensureUpToDateInstallation() {
  const nxJsonPath = path.join(__dirname, '..', 'nx.json');
  let nxJson;

  try {
    nxJson = require(nxJsonPath);
    if (!nxJson.installation) {
      console.error(
        '[NX]: The "installation" entry in nx.json is required when running the Nx wrapper.',
      );
      process.exit(1);
    }
  } catch (error) {
    console.error(
      `[NX]: Failed to load nx.json: ${error instanceof Error ? error.message : error}`,
    );
    process.exit(1);
  }

  try {
    ensureDir(path.join(__dirname, 'installation'));
    const currentInstallation = getCurrentInstallation();
    if (!matchesCurrentNxInstall(currentInstallation, nxJson.installation)) {
      performInstallation(currentInstallation, nxJson);
    }
  } catch (error) {
    console.error('[NX]: Nx wrapper failed to synchronize installation.');
    if (error instanceof Error) {
      console.error(error.message);
      console.error(error.stack);
    } else {
      console.error(error.toString());
    }
    process.exit(1);
  }
}

if (!process.env.NX_WRAPPER_SKIP_INSTALL) {
  ensureUpToDateInstallation();
}

require('./installation/node_modules/nx/dist/bin/nx');
