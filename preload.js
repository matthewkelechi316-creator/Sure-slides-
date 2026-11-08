const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("sureSlides", {
  appName: "SureSlides",
  version: "1.1.0",
  startOutputs: () => ipcRenderer.invoke("outputs:start"),
  stopOutputs: () => ipcRenderer.invoke("outputs:stop"),
  sendSlide: slide => ipcRenderer.send("slides:update", slide),
  onSlide: callback => ipcRenderer.on("slides:render", (_event, slide) => callback(slide))
});