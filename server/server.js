require('./config/config');

const mongoose = require('mongoose')
const express = require('express')
const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(require('./routes/usuario'));
app.use(require('./routes/login'));

mongoose.connect(process.env.URL_DB, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    },
    (err) => {
        if (err) {
            throw err;

        }
        console.log('DDBB on line');

    });

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});