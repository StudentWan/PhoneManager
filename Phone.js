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
        this.status = status;
    }

    installAPK() {
        var files = fs.readdirSync('/root/Workspace/PhoneManager/app/');
        var apk = '/root/DevControl/app/' + files[0];
        client.install(this.id, apk);
    }

    return() {
        this.status = 0;
    }
}

export default Phone;