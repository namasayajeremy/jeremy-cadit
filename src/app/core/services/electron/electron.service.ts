import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';

@Injectable({
  providedIn: 'root',
})
export class ElectronService {
  ipcRenderer: typeof ipcRenderer;

  constructor() {
    if (this.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
    }
  }

  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }
  openFileDialog() {
    return ipcRenderer.invoke('open-dialog-and-read');
  }

  selectFileDir() {
    return ipcRenderer.invoke('select-file-directory');
  }

  saveDatatoDir(data: object[]) {
    return ipcRenderer.send('create-and-store-data', data);
  }

  createJSONFile(path: string) {
    return ipcRenderer.send('create-json-file', path);
  }

  appendToJSONFile(path: string, data: object[]) {
    return ipcRenderer.send('append-json-file', path, data);
  }
}
