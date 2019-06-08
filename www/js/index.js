var app = {
    // Application Constructor
    initialize: function () {
        timeDisplay();
        setInterval(timeDisplay, 1000);
        document.getElementById("scanstudent").disabled = true;
        document.getElementById("submit").disabled = true;
        document.addEventListener('DOMContentLoaded', function () {
            modal();
        });
    },
};
document.getElementById("loginbtn").addEventListener("click", login);
document.getElementById("scanadmin").addEventListener("click", scanAdmin);
document.getElementById("logout").addEventListener("click", logout);
document.getElementById("scanstudent").addEventListener("click", scanStudent);
document.getElementById("clearstudent").addEventListener("click", clearStudent);
document.getElementById("submit").addEventListener("click", submit);

function modal() {
    var Modalelem = document.querySelector('.modal');
    var instance = M.Modal.init(Modalelem, {
        dismissible: false
    });
    instance.open();
}

function login() {
    var adminid = document.getElementById("modaladminid").value;
    if (adminid != "") {
            // hard coded attendance passcode
        if (document.getElementById("pw").value == <fill passcode>) {
            var elems = document.getElementById('modal1');
            var instance = M.Modal.getInstance(elems);
            instance.close();
            document.getElementById("scanstudent").disabled = false;
        } else {
            document.getElementById('error').innerText = "Wrong code";
        }
    } else {
        document.getElementById('error').innerText = "Fill in admin id";
    }
}

function scanAdmin() {
    cordova.plugins.barcodeScanner.scan(
        function (result) {
            if (result.cancelled == false) {
                //if admin scan not cancelled, display admin id in field and enable scan student
                document.getElementById("adminid").innerText = result.text;
                document.getElementById("modaladminid").value = result.text;
                document.getElementById("scanstudent").disabled = false;
            }
        },
        function (error) {
            alert("Scanning failed: " + error);
        }, {
            preferFrontCamera: false, // iOS and Android
            showFlipCameraButton: false, // iOS and Android
            showTorchButton: true, // iOS and Android
            torchOn: false, // Android, launch with the torch switched on (if available)
            prompt: "Scan admin barcode", // Android
            resultDisplayDuration: 0, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
            formats: "CODE_39", // default: all but PDF_417 and RSS_EXPANDED
            orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
            disableSuccessBeep: false // iOS and Android
        }
    );
}

//logout so clear everything. adminid, cardid flushed & student scan + submit disabled
function logout() {
    document.getElementById("adminid").innerText = "";
    document.getElementById("modaladminid").value = "";
    document.getElementById("cardid").value = "";
    document.getElementById("scanstudent").disabled = true;
    document.getElementById("submit").disabled = true;
    modal();
}

//clear student id
function clearStudent() {
    document.getElementById("cardid").value = "";
    document.getElementById("submit").disabled = true;
}

function scanStudent() {
    cordova.plugins.barcodeScanner.scan(
        function (result) {
            if (result.cancelled == false) {
                //if never cancel, display student id and enable submit button
                document.getElementById("cardid").value = result.text;
                document.getElementById("submit").disabled = false;
            }
        },
        function (error) {
            alert("Scanning failed: " + error);
        }, {
            preferFrontCamera: false, // iOS and Android
            showFlipCameraButton: false, // iOS and Android
            showTorchButton: true, // iOS and Android
            torchOn: false, // Android, launch with the torch switched on (if available)
            prompt: "Scan attendees' student ID", // Android
            resultDisplayDuration: 0, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
            formats: "CODE_39", // default: all but PDF_417 and RSS_EXPANDED
            orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
            disableSuccessBeep: false // iOS and Android
        }
    );
}

function submit() {
    //upon submit disable button to prevent double
    document.getElementById("submit").disabled = true;
    var cardid = document.getElementById("cardid").value;
    var currentdatestring = document.getElementById("date").innerText;
    var adminid = document.getElementById("adminid").innerText;
    var data = JSON.stringify({
        "value1": cardid,
        "value2": currentdatestring,
        "value3": adminid,
    })

    const request = new XMLHttpRequest();
    request.addEventListener('load', function () {
        if (this.readyState === 4 && this.status === 200) {
            //display success text and auto dismiss in 2s
            M.toast({
                html: cardid + " attendance is checked.",
                displayLength: 1000
            });
            //flush sutdent details
            clearStudent();
        }
    });

    // replace placeholder with your IFTTT webhook link
    request.open('POST', '<placeholder>', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(data);
}

function timeDisplay() {
    var currentTime = new Date();
    var day = currentTime.getDay();
    var date = currentTime.getDate();
    var month = currentTime.getMonth();
    var year = currentTime.getFullYear();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    var weekday = new Array(7);
    weekday[0] = "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thu";
    weekday[5] = "Fri";
    weekday[6] = "Sat";

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    var dateDiv = document.getElementById('date');
    var TimeDiv = document.getElementById('time');
    dateDiv.innerText = date + "/" + month + "/" + year + " " + weekday[day];
    TimeDiv.innerText = hours + ":" + minutes + ":" + seconds;
}

app.initialize();
