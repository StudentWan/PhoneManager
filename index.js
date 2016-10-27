import PhoneManager from "./PhoneManager";

var m = PhoneManager.getInstance();
var timer = setInterval(function () {
    p = m.getPhone();
    if (p != null) {
        clearInterval(timer);
        p.openLogCat(function (logcat) {
            logcat.on('entry', function (entry) {
                console.log(entry.message);
            });

            // Make sure we don't leave anything hanging 
            process.on('exit', function () {
                proc.kill();
            });
        });
    }
}, 1000);


