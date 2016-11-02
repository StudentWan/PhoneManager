import PhoneManager from "./PhoneManager";
var spawn = require('child_process').spawn;

var proc = spawn('adb', ['logcat', '-B']);

var p;
var m = PhoneManager.getInstance();
var timer = setInterval(function () {
    p = m.getPhone();
    if (p != null) {
        clearInterval(timer);
        var promise = p.openLogCat();
        promise.then(function (logcat) {
            logcat.on('entry', function (entry) {
                    console.log(entry.message);
                });

        //Make sure we don't leave anything hanging 
        process.on('exit', function () {
                proc.kill();
            });
        }).catch(function (err) {
                throw err;
        });
    }   
}, 1000);
