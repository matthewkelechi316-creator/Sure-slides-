const { app, BrowserWindow, ipcMain, screen } = require("electron");
const path = require("path");

let controlWindow;
let fullWindow;
let alphaWindow;

function outputWindow(kind) {
  const display = screen.getPrimaryDisplay();
  const win = new BrowserWindow({
    x: display.bounds.x, y: display.bounds.y,
    width: display.bounds.width, height: display.bounds.height,
    show: true, frame: false, autoHideMenuBar: true,
    backgroundColor: kind === "alpha" ? "#00000000" : "#10131a",
    transparent: kind === "alpha",
    hasShadow: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  win.loadFile("output.html", { query: { mode: kind } });
  win.setMenuBarVisibility(false);
  return win;
}

function createControl() {
  controlWindow = new BrowserWindow({
    width: 1440, height: 920, minWidth: 1050, minHeight: 680,
    backgroundColor: "#10131a", title: "SureSlides",
    webPreferences: { preload: path.join(__dirname, "preload.js"), contextIsolation: true, nodeIntegration: false }
  });
  controlWindow.loadFile("index.html");
}

app.whenReady().then(() => {
  ipcMain.handle("outputs:start", () => {
    if (!fullWindow || fullWindow.isDestroyed()) fullWindow = outputWindow("full");
    if (!alphaWindow || alphaWindow.isDestroyed()) alphaWindow = outputWindow("alpha");
    return { full: true, alpha: true };
  });
  ipcMain.handle("outputs:stop", () => {
    if (fullWindow && !fullWindow.isDestroyed()) fullWindow.close();
    if (alphaWindow && !alphaWindow.isDestroyed()) alphaWindow.close();
    fullWindow = null; alphaWindow = null;
    return true;
  });
  ipcMain.on("slides:update", (_event, slide) => {
    [fullWindow, alphaWindow].forEach(w => {
      if (w && !w.isDestroyed()) w.webContents.send("slides:render", slide);
    });
  });
  createControl();
  app.on("activate", () => { if (BrowserWindow.getAllWindows().length === 0) createControl(); });
});
app.on("window-all-closed", () => { if (process.platform !== "darwin") app.quit(); });