"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var fs = require("fs");
electron_1.ipcMain.handle('open-dialog-and-read', function () { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, electron_1.dialog.showOpenDialog({
                    properties: ['openFile'],
                    filters: [{ name: 'JSON Files', extensions: ['json'] }],
                })];
            case 1:
                res = _a.sent();
                return [2 /*return*/, readJSONFile(res.filePaths[0])];
        }
    });
}); });
electron_1.ipcMain.handle('select-file-directory', function () { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, electron_1.dialog.showSaveDialog({
                    title: 'Select directory where JSON File will be stored',
                    filters: [{ name: 'JSON Files', extensions: ['json'] }],
                })];
            case 1:
                res = _a.sent();
                if (res.filePath) {
                    return [2 /*return*/, res];
                }
                return [2 /*return*/];
        }
    });
}); });
electron_1.ipcMain.on('create-and-store-data', function (event, data) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, electron_1.dialog.showSaveDialog({
                    title: 'Choose file directory to save file',
                    filters: [{ name: 'JSON Files', extensions: ['json'] }],
                })];
            case 1:
                res = _a.sent();
                if (res.filePath) {
                    createJSONFIle(res.filePath, data);
                }
                return [2 /*return*/];
        }
    });
}); });
electron_1.ipcMain.on('create-json-file', function (event, path) { return createJSONFIle(path); });
electron_1.ipcMain.on('append-json-file', function (event, path, data) { return appendJSON(path, data); });
function readJSONFile(path) {
    var res = {
        path: path,
        data: JSON.parse(fs.readFileSync(path, 'utf8')).array,
    };
    return res;
}
function createJSONFIle(path, data) {
    var json;
    if (data) {
        json = "{\"array\":" + JSON.stringify(data) + "}";
    }
    else {
        json = '{"array":[]}';
    }
    fs.writeFile(path, json, 'utf-8', function (err) {
        if (err)
            throw err;
    });
}
function appendJSON(path, simulationData) {
    fs.readFile(path, function (err, data) {
        var _a;
        if (err)
            throw err;
        var json = JSON.parse(data.toString('utf-8'));
        (_a = json.array).push.apply(_a, simulationData);
        fs.writeFile(path, JSON.stringify(json), function (err) {
            if (err)
                throw err;
        });
    });
}
//# sourceMappingURL=file-interface.js.map