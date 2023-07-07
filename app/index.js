const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.use(express.static('static'));
app.use(
    session({
        secret: 'alkwejfdenf',
        resave: true,
        saveUninitialized: true
    })
);
require('./route/index')(app);
app.listen(3000, function() {
    console.log('Hello :3000');
});