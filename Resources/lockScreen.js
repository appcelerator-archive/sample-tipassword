var createLockScreen = function(options) {
	
	if (Titanium.Platform.name == 'android') {
    	throw "lockScreen error: This is only supported by iPhone!";
    }
    
	var options = options == undefined ? {} : options;
	
	var passwordScreen = null;
	
	var password = Ti.UI.createTextField({
			width:300,
			height:40,
			hintText: 'Enter your ' + (options.numPad == true ? 'pin code' : 'password'),
			backgroundColor:'white',
			appearance:Titanium.UI.KEYBOARD_APPEARANCE_ALERT,
			font:{fontSize:28}
	});
		
	function checkPassword(password) {
						
			if(Ti.App.Properties.getString('lock_key') == password) {
				return true;
			}
			
			return false;
	}
	
	function setPassword(password) {
				
			if(options.numPad == true && typeof(password) == 'string') {
				throw "lockScreen error: This is defined to use an integer!";
			}
						
			Ti.App.Properties.setString('lock_key',password);
	}
	
	function lockApp() {
			if(Ti.App.Properties.hasProperty('lock_key') == false) {
				return false;
			}
			
			if(passwordScreen == null) {
				passwordScreen = createLockScreen();
			}
			
			if(!passwordScreen.locked) {
    			passwordScreen.locked = true;
    			
    			setTimeout(function() {
    			     passwordScreen.open({modal: true});
    			}, 5);
			}
			
			// Let the open event fire
			passwordScreen.addEventListener('focus', function() {
			    password.focus();
			});
			
			return true;
	}
	
	function unlockApp() {
		    if(passwordScreen.locked) {
		        password.value = '';
                passwordScreen.locked = false;
            }
			passwordScreen.close();
			
	}
	
	function createLockScreen() {
			win = Ti.UI.createWindow({
				navBarHidden: true,
				locked: false
			});
			
			options.backgroundColor != undefined ? win.backgroundColor = options.backgroundColor : false;
			options.backgroundImage != undefined ? win.backgroundImage = options.backgroundImage : false;
			(options.numPad != undefined && options.numPad == true) ? password.keyboardType = Titanium.UI.KEYBOARD_NUMBER_PAD : false;
			
			
			title = Ti.UI.createView({
				backgroundImage:'images/pc_bg.png',
				height:100,
				top:0
			});
			win.add(title);
			
			text = Ti.UI.createLabel({
				text:'Enter Passcode',
				shadowColor:"#333",
				shadowOffset:{x:-2,y:-2},
				font:{fontSize:34},
				color:'white',
				textAlign: 'center'
			});
			title.add(text);
			
			pass_holder = Ti.UI.createView({
				top:175,
				backgroundImage:'images/pc_bg.png',
				height:70
			});
			pass_holder.add(password);
			win.add(pass_holder);
			
			//never loose focus
			password.addEventListener('blur', function() {
				password.focus();
			});
			
			var answer = Ti.App.Properties.getString('lock_key');
			
			password.addEventListener('change', function() {
				if(checkPassword(password.value) == true) {
					unlockApp();
				}

				if(options.numPad == true && password.value.length >= answer.length) {
				    password.value = '';
				    alert('The password entered was not correct');
				}
			});
			
			password.addEventListener('return', function() {
				if(checkPassword(password.value) == false) {
					alert('The password entered was not correct');
					password.value = '';
					
					password.focus();
				} else {
				    password.value = '';
					unlockApp();
				}
			});
			
			return win;
	}
	
	return {
		
		setPassword : function(password) { setPassword(password) },
		
		checkPassword : function(password) { checkPassword(password) },
		
		lockApp : function() { lockApp() },
		
		unlockApp : function() { unlockApp() }
	}
}
