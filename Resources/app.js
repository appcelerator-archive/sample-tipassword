Ti.include('lockScreen.js');

lockScreen = createLockScreen({
	backgroundImage:'images/bg.png',
	numPad: true
});

lockScreen.setPassword(2580);

lockScreen.lockApp();

var tabGroup = Ti.UI.createTabGroup();

var win1 = Titanium.UI.createWindow({
  title:'Window 1',
  backgroundColor:'blue'
});

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