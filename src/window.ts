import { app, BrowserWindow } from "electron";
import { join } from "path";
import { format } from "url";

let win: BrowserWindow;

function createWindow(): void {

  win = new BrowserWindow({width: 800, height: 600});

  win.loadURL(format({
    pathname: join(__dirname, "index.html"),
    protocol: "file:",
    slashes: true
  }));

  win.webContents.openDevTools();

  win.on("closed", () => {
    win = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (window === null) {
    createWindow();
  }
});
