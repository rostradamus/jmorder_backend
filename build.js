import { removeSync, copySync } from 'fs-extra';
import { exec } from 'child_process';


try {
  // Remove current build
  removeSync('./dist/');
  // Copy front-end files
  copySync('./src/public', './dist/public');
  copySync('./src/views', './dist/views');
  // Transpile the typescript files
  const proc = exec('tsc --build tsconfig.prod.json');
  proc.on('close', (code) => {
    if (code !== 0) {
      throw Error("Build failed")
    }
  })
} catch (err) {
  console.log(err);
}
