const { exec } = require('child_process');
const { argv } = require('node:process');

const beta = argv.includes('--beta') ? '--tag beta' : '';

exec(`npm publish ./dist/ds-ng --access public ${beta}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error al publicar: ${error}`);
    return;
  }
  console.log(`Resultado: ${stdout}`);
  if (stderr) {
    console.error(`Errores: ${stderr}`);
  }
});
