const express = require('express')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuaro');
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
        let token = jwt.sing({ usuario: usuarioDB }, 'secret', { expiresIn: 60 * 60 });
        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });
    });
});

module.exports = app;