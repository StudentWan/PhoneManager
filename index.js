import PhoneManager from "./PhoneManager";
var p = null;
var m = PhoneManager.getInstance();
var timer = setInterval(function() {
    p = m.getPhone();
    if(p != null) {
        clearInterval(timer);
        p.installAPK();
    }
}, 1000);

