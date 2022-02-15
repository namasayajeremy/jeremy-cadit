import { dialog, ipcMain } from 'electron';
import * as fs from 'fs';

ipcMain.handle('open-file-dialog', () => {
  return dialog
    .showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'JSON Files', extensions: ['json'] }],
    })
    .then((res) => readFile(res.filePaths[0]));
});

function readFile(path: string) {
  const res = {
    path,
    data: JSON.parse(fs.readFileSync(path, 'utf8')).array as Array<object>,
  };
  return res;
}
