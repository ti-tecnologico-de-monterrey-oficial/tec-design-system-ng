const { exec } = require("child_process");
const { argv } = require("node:process");

const beta = argv.includes("--beta") ? "--tag beta" : "";
const supportedVersions = ["17", "18", "19"];

async function publishLib(version) {
  exec(
    `npm publish ./dist/ds-ng-${version} --access public ${beta}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error al publicar: ${error}`);
        return;
      }
      console.log(`Resultado: ${stdout}`);
      if (stderr) {
        console.error(`Errores: ${stderr}`);
      }
    },
  );
}

supportedVersions.forEach((version) => {
  console.log(`Publicando Angular ${version}...`);
  publishLib(version);
});
