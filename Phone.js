var fs = require('fs');
var adb = require('adbkit');
var client = adb.createClient();

const EventEmitter = require("events");

class Phone extends EventEmitter {
    
    constructor(id, type, time, status) {
        super();
        this.id = id;
        this.type = type;
        this.time = time;
        //status == 0 available
        //status == 1 unavailable
        //status == 2 removed
        this.status = status;
    }

    installApk() {
        if(this.status == 1) {
        var files = fs.readdirSync('/root/Workspace/PhoneManager/app/');
        var apk = '/root/DevControl/app/' + files[0];
        client.install(this.id, apk);
        console.log('This apk will be installed soon.');
        } else {
            console.log('You dont have a phone.');
        }
    }

    openLogCat(callback) {
        if(this.status == 1) {
        return client.openLogcat(this.id);
        } else {
            return null;
        } 
    }

    return() {
        this.status = 0;
    }
}

export default Phone;