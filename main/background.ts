import { app, ipcMain } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';


const isProd: boolean = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow('main', {
    minWidth: 700,
    minHeight: 590,
    width: 1000,
    height: 600,
    maximizable: false,
    autoHideMenuBar: true,
    frame: false,
    resizable: false,
    icon: "./resources/icon.ico",
    webPreferences: {
      devTools: false
      }
    
  });

  if (isProd) {
    await mainWindow.loadURL('app://./home.html');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
   
}



/*Custom menubar */

ipcMain.on('quit-app', () =>{
  app.quit();
});

ipcMain.on('minimize', () =>{
  mainWindow.minimize();
});

ipcMain.on('maximize', () =>{
  mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
});

  
})();

app.on('window-all-closed', () => {
  app.quit();
});

