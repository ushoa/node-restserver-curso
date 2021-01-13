require('./config/config');

const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.resolve(__dirname, '../public')));
// parse application/json
app.use(bodyParser.json())

app.use(require('./routes/routes'));

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