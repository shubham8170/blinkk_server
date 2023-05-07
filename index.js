const express = require('express')
const db = require('./database/db')
const app = express();
const cors = require('cors');
const pushNotificationSchedular = require('./services/cloudMessage')
app.use(cors({
    origin: '*'
}));
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
const port = 8080
const router = require('./apis/usercreds/post/signup');
app.use(router);
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Blinkk app listening on port ${port}!`));

