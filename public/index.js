const {
	app,
	BrowserWindow,
	Menu,
	MenuItem,
} = require('electron');
const path = require('path');

const isMac = process.platform === 'darwin';
const tpl = [{
	label: 'File',
	submenu: [{
			label: 'New'
		},
		{
			label: 'Open'
		},
		{
			type: 'separator'
		},
		{
			label: 'Export'
		},
		{
			type: 'separator'
		},
		isMac ? {
			role: 'close'
		} : {
			role: 'quit'
		},
	],
}, {
	label: 'Edit',
	submenu: [{
			role: 'undo'
		},
		{
			role: 'redo'
		},
		{
			type: 'separator'
		},
		{
			role: 'cut'
		},
		{
			role: 'copy'
		},
		{
			role: 'paste'
		},
		...(isMac ? [{
				role: 'pasteAndMatchStyle'
			},
			{
				role: 'delete'
			},
			{
				role: 'selectAll'
			},
			{
				type: 'separator'
			},
			{
				label: 'Speech',
				submenu: [{
						role: 'startSpeaking'
					},
					{
						role: 'stopSpeaking'
					}
				]
			}
		] : [{
				role: 'delete'
			},
			{
				type: 'separator'
			},
			{
				role: 'selectAll'
			}
		])
	]
}, ];
Menu.setApplicationMenu(Menu.buildFromTemplate(tpl));

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line global-require
if (require('electron-squirrel-startup')) {
	app.quit();
}

const createWindow = () => {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 1600,
		height: 800,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		},
	});

	// and load the index.html of the app.
	mainWindow.loadURL('http://localhost:5173/');

	// Open the DevTools.
	mainWindow.webContents.openDevTools();

	mainWindow.webContents.on('context-menu', (event, params) => {
		const menu = new Menu();

		// menu.append(
		// 	new MenuItem({
		// 		label: 'Add',
		// 		click: () => mainWindow.webContents.session.addWordToSpellCheckerDictionary(params.misspelledWord)
		// 	})
		// );

		menu.popup();
	})
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
