const sendNotification = require('../cloudmessaging/index');
const User = require('../database/schemas/userschema');
var cron = require('node-cron');

const getAllUser = async () => {
    return await User.find();
}

const pushNotification = async () => {
    try {
        const users = await getAllUser();
        for (let user of users) {
            let token = user.browser_token;
            if (token) {
                console.log('token -----------> ', token);
                await sendNotification(token);
            }
        }
    }
    catch (e) {
        console.log(e);
    }
}

(async function () {
    cron.schedule('*/10 * * * * *', async () => {
        await pushNotification();
    });
})();

