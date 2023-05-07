var cron = require('node-cron');
var FCM = require('fcm-node');
require('dotenv').config();
var serverKey = process.env.Firebase_ServerKey;
var fcm = new FCM(serverKey);



const sendNotification = async (token) => {
    var message = {
        to: token,
        notification: {
            title: 'Blinkk',
            body: 'Welcome to blinkk',
            "sound": "mySound",
            "icon": "https://firebasestorage.googleapis.com/v0/b/blinkkopticals-6c609.appspot.com/o/Blinkk.png?alt=media&token=1bb4807c-2ec0-4078-bbc3-eec0da794288",
        },
    };

    fcm.send(message, function (err, response) {
        if (err) {
            console.log("Something has gone wrong!" + err);
            console.log("Respponse:! " + response);
        } else {
            console.log("Successfully sent with response: ", response);
        }

    });
}


module.exports = sendNotification

