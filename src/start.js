const { app, BrowserWindow } = require('electron');

const fs = require('fs-extra');
const path = require('path');
const url = require('url');
const { dialog } = require('electron');
const ipc = require('electron').ipcMain;
//const SQL = require('sql.js');
// const filebuffer = fs.readFileSync('fba.db');
// const db = new SQL.Database(filebuffer);
//const contents = db.exec('SELECT * FROM table');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    minWidth: 1000,
    minHeight: 720,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadURL(
    process.env.ELECTRON_START_URL ||
      url.format({
        pathname: path.join(__dirname, '/../public/index.html'),
        protocol: 'file:',
        slashes: true
      })
  );

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

let dir, files;

ipc.on('selectDirectory', (event, args) => {
  // dir = dialog.showOpenDialogSync(mainWindow, {
  //   properties: ['openDirectory']
  // });
  // dialog.showOpenDialog(filePaths => {
  //   console.log(filePaths);
  // });
});
