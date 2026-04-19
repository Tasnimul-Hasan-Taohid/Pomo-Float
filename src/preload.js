'use strict';
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('pomo', {
  drag:      (delta)  => ipcRenderer.send('window-drag', delta),
  close:     ()       => ipcRenderer.send('window-close'),
  hide:      ()       => ipcRenderer.send('window-hide'),
  toggleTop: (val)    => ipcRenderer.send('toggle-top', val),
  setSize:   (w, h)   => ipcRenderer.send('set-size', { w, h }),
});
