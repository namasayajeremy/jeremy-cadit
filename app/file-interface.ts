import { dialog, ipcMain } from 'electron';
import * as fs from 'fs';

ipcMain.handle('open-dialog-and-read', async () => {
  const res = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'JSON Files', extensions: ['json'] }],
  });
  return readJSONFile(res.filePaths[0]);
});

ipcMain.handle('select-file-directory', async () => {
  const res = await dialog.showSaveDialog({
    title: 'Select directory where JSON File will be stored',
    filters: [{ name: 'JSON Files', extensions: ['json'] }],
  });
  if (res.filePath) {
    return res;
  }
});

ipcMain.handle('create-and-store-data', async (event, data) => {
  const res = await dialog.showSaveDialog({
    title: 'Choose file directory to save file',
    filters: [{ name: 'JSON Files', extensions: ['json'] }],
  });
  if (res.filePath) {
    createJSONFIle(res.filePath, data);
    return res;
  }
});

ipcMain.on('create-json-file', (event, path) => createJSONFIle(path));
ipcMain.on('append-json-file', (event, path, data) => appendJSON(path, data));

function readJSONFile(path: string) {
  const res = {
    path,
    data: JSON.parse(fs.readFileSync(path, 'utf8')).array as Array<object>,
  };
  return res;
}

function createJSONFIle(path: string, data?) {
  let json: string;
  if (data) {
    json = `{"array":${JSON.stringify(data)}}`;
  } else {
    json = '{"array":[]}';
  }
  fs.writeFile(path, json, 'utf-8', (err) => {
    if (err) throw err;
  });
}

function appendJSON(path: string, simulationData: object[]) {
  fs.readFile(path, (err, data) => {
    if (err) throw err;
    const json = JSON.parse(data.toString('utf-8'));
    (json.array as Array<any>).push(...simulationData);
    fs.writeFile(path, JSON.stringify(json), function (err) {
      if (err) throw err;
    });
  });
}
