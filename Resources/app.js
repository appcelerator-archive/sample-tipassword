var resources = Titanium.Filesystem.resourcesDirectory;

if (Titanium.Platform.name == 'iPhone OS') {
    resources = '/';
}
Titanium.include(resources + 'lockScreen.js');

lockScreen = createLockScreen({
	backgroundImage:'images/bg.png',
	numPad: true
});

lockScreen.setPassword(2580);

lockScreen.lockApp();

Ti.App.addEventListener('pause',function(e){
    lockScreen.lockApp();
    Ti.API.info("app was paused from the foreground");
});

var tabGroup = Ti.UI.createTabGroup();

var win1 = Titanium.UI.createWindow({
  title:'Window 1',
  backgroundColor:'blue'
});

win1.add(Ti.UI.createLabel({
    width:'auto',
    height:'auto',
    text: 'Close/pause and re-open the app to re-lock the screen.',
    color: 'white'
}));

var tab1 = Ti.UI.createTab({
	title: 'test',
	window: win1
});

var win2 = Titanium.UI.createWindow({
  title:'Window 2',
  backgroundColor:'red'
});

var tab2 = Ti.UI.createTab({
	title: 'test 2',
	window: win2
});

tabGroup.addTab(tab1);
tabGroup.addTab(tab2);

tabGroup.open();