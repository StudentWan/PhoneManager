import Phone from './Phone';

var adb = require('adbkit');
var client = adb.createClient();

var _singleton = null;

class PhoneManager {

    static getInstance() {
        if (_singleton == null) {
            _singleton = new PhoneManager();
        }
        return _singleton;
    }

    constructor() {
        this._phones = [];
        var that = this;
        client.trackDevices()
            .then(function (tracker) {
                tracker.on('add', function (device) {
                    console.log('Device %s was plugged in', device.id);
                    var id = device.id;
                    var type = device.type;
                    var time = new Date().getTime();
                    that.add(id, type, time, 0);
                });
                tracker.on('remove', function (device) {
                    console.log('Device %s was unplugged', device.id);
                    var delId = device.id;
                    that.remove(delId);
                });
                tracker.on('end', function () {
                    console.log('Tracking stopped');
                });
            }).catch(function (err) {
                console.error('Something went wrong:', err.stack);
            });
    }

    add(id, type, time, status) {
        var phone = new Phone(id, type, time, status);
        this._phones.push(phone);
        return phone;
    }

    remove(id) {
        for (var i in this._phones) {
            if (this._phones[i].id = id) {
                delete this._phone[i];
                break;
            }
        }
    }

    getPhone() {
        if (this._phones.length != 0) {
            for (var i in this._phones) {
                if (this._phones[i].status == 0) {
                    this._phones[i].status = 1;
                    return this._phones[i];
                }
            }
        }
        return null;
    }
}

export default PhoneManager;
