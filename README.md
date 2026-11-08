# SureSlides 1.1

Standalone Windows church presentation software built with Electron.

## Implemented in this starter
- Slide editor with songs/hymns, Bible reading and announcement shortcuts
- Full-screen local output window
- Transparent local overlay output window
- Updates from the control app are sent to both output windows
- Offline-first local presentation editor

## NDI status
The two output windows are the rendering layer for the planned NDI sender. **This ZIP does not yet transmit an NDI stream.** Native NDI sending requires the NDI SDK/runtime and a Windows native bridge compiled for the Electron version and target architecture. The next stage is to add and test that bridge, then expose the two named NDI sources in OBS/vMix.

## Run on Windows 11
1. Install Node.js LTS.
2. Extract this folder.
3. Open PowerShell in this folder.
4. Run `npm install`
5. Run `npm start`

## Build Windows installer
Run `npm run dist`. The installer appears in `release`.

Do not upload `node_modules` or `release` to GitHub.
