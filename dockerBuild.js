const { exec } = require('child_process');
const util = require('util');
const fs = require('fs');

const execPromise = util.promisify(exec);
const supportedVersions = ['18', '19', '20', '21'];

async function runDockerCommands(version) {
  try {
    // 1. Build Docker image
    await execPromise(
      `docker build -t angular-lib-${version} -f Dockerfile-${version} .`,
    );
    console.log('Docker image built successfully');

    // 2. Create temporary container
    await execPromise(
      `docker create --name temp-container-${version} angular-lib-${version}`,
    );
    console.log('Temporary container created');

    // 3. Ensure destination directory exists
    await fs.promises.mkdir(`./dist/ds-ng-${version}`, { recursive: true });

    // 4. Copy files from container
    await execPromise(
      `docker cp temp-container-${version}:/ds-ng ./dist/ds-ng-${version}`,
    );
    console.log('Files copied successfully');

    // 5. Modify package.json
    const packageJsonPath = `./dist/ds-ng-${version}/ds-ng/package.json`;
    const packageJsonRaw = await fs.promises.readFile(packageJsonPath, 'utf-8');
    const packageJson = JSON.parse(packageJsonRaw);
    // 5.1 Update version: "1.5.10" -> "1.5.10-17-d"
    const currentVersion = packageJson.version;
    packageJson.version = currentVersion.replace('{angularVersion}', version);

    await fs.promises.writeFile(
      packageJsonPath,
      JSON.stringify(packageJson, null, 2),
      'utf-8',
    );
    console.log(`package.json updated: version set to ${packageJson.version}`);
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    // 5. Always clean up the container
    try {
      await execPromise(`docker rm temp-container-${version}`);
      console.log(`Temporary container removed - ${version}`);
    } catch (cleanupError) {
      console.warn('Cleanup warning:', cleanupError.message);
    }
  }
}

// Run the script
(async () => {
  supportedVersions.forEach(async (version) => {
    console.log(`Running Docker commands for Angular version ${version}...`);
    await runDockerCommands(version);
  });
})();
