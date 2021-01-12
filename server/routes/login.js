const express = require('express')
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuaro');
const jwt = require('jsonwebtoken');
const app = express();

app.post('/login', (req, res) => {
    let body = req.body
    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario y contraseña no coinciden'
                }
            });
        }
        if (!bcrypt.compareSync(body.pass, usuarioDB.pass)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario y contraseña no coinciden'
                }
            });
        }
        let token = jwt.sign({ usuario: usuarioDB }, process.env.SEED, { expiresIn: process.env.TIEMPO_TOKEN });
        res.json({
            ok: true,
            usuarioDB,
            token
        });
    });
});

module.exports = app;