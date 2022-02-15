"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var fs = require("fs");
electron_1.ipcMain.handle('open-file-dialog', function () {
    return electron_1.dialog
        .showOpenDialog({
        properties: ['openFile'],
        filters: [{ name: 'JSON Files', extensions: ['json'] }],
    })
        .then(function (res) { return readFile(res.filePaths[0]); });
});
function readFile(path) {
    var res = {
        path: path,
        data: JSON.parse(fs.readFileSync(path, 'utf8')).array,
    };
    return res;
}
//# sourceMappingURL=file-interface.js.map