const { exec } = require('child_process');
const util = require('util');
const fs = require('fs');

const execPromise = util.promisify(exec);
const supportedVersions = ['17', '18', '19'];

async function runDockerCommands(version) {
  try {
    // 1. Build Docker image
    await execPromise(`docker build -t angular-lib-${version} .`);
    console.log('Docker image built successfully');

    // 2. Create temporary container
    await execPromise(`docker create --name temp-container-${version} angular-lib-${version}`);
    console.log('Temporary container created');

    // 3. Ensure destination directory exists
    await fs.promises.mkdir(`./dist/ds-ng-${version}`, { recursive: true });

    // 4. Copy files from container
    await execPromise(`docker cp temp-container-${version}:/ds-ng ./dist/ds-ng-${version}`);
    console.log('Files copied successfully');

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    // 5. Always clean up the container
    try {
      await execPromise(`docker rm temp-container-${version}`);
      console.log('Temporary container removed');
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
