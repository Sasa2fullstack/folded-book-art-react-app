const { app, BrowserWindow } = require('electron');

const fse = require('fs-extra');
const path = require('path');
const url = require('url');
const ipcMain = require('electron').ipcMain;
const uuidV4 = require('uuid/v4');
const getAppDataPath = require('appdata-path');
const moment = require('moment');

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: 'database/fba.db'
  }
});

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

ipcMain.on('fba-new-silhouette', async (event, args) => {
  try {
    const uuid = uuidV4();
    const newFilePath = getAppDataPath('fba-app-v1.0/silhouettes/' + uuid).replace(/\\/g, '/');
    fse.copySync(args.path, newFilePath);
    const res = await knex('silhouettes').insert({
      name: args.name,
      path: newFilePath,
      created_datetime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    });
    event.returnValue = res;
  } catch (error) {
    event.returnValue = null;
  }
});

ipcMain.on('fba-get-silhouettes', async (event, args) => {
  try {
    const res = await knex('silhouettes').orderBy('created_datetime', 'desc');
    event.returnValue = res;
  } catch (error) {
    event.returnValue = [];
  }
});

ipcMain.on('fba-remove-silhouette-byId', async (event, args) => {
  try {
    const rec = await knex('silhouettes').where('id', args.id);
    if (rec && rec[0]) {
      fse.removeSync(rec[0].path);
      const res = await knex('silhouettes')
        .where('id', args.id)
        .del();
      event.returnValue = res;
    } else {
      event.returnValue = null;
    }
  } catch (error) {
    event.returnValue = null;
  }
});
