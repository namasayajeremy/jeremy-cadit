import { dialog, ipcMain } from 'electron';
import * as fs from 'fs';

ipcMain.handle('open-file-and-read', async () => {
  const res = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'JSON Files', extensions: ['json'] }],
  });
  return readFile(res.filePaths[0]);
});

ipcMain.handle('save-directory', async () => {
  const res = await dialog.showSaveDialog({
    title: 'Create JSON File to be stored',
    filters: [{ name: 'JSON Files', extensions: ['json'] }],
  });
  if (res.filePath) {
    fs.writeFile(res.filePath, '', 'utf-8', (err) => {
      if (err) throw err;
      //insert watch
    });
  }
});

function readFile(path: string) {
  const res = {
    path,
    data: JSON.parse(fs.readFileSync(path, 'utf8')).array as Array<object>,
  };
  return res;
}
