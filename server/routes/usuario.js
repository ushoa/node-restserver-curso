const express = require('express')
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuaro');
const { chekToken } = require('../middlewares/autenticacion');
const app = express();

app.get('/usuario', chekToken, (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let hasta = req.query.hasta || 5;
    hasta = Number(hasta);
    //Entre llaves los datos que coincidad con su propiedad {google=true}
    //despues de las llaves los campos que quiero que se muesres 'nombre email etc'
    //Usuario.find({google=true},'nombre email etc')
    Usuario.find({ estado: true })
        .skip(desde)
        .limit(hasta)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Usuario.countDocuments({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    conteo
                });
            })
        });
});

app.post('/usuario', chekToken, function(req, res) {
    let body = req.body;
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        pass: bcrypt.hashSync(body.pass, 10),
        role: body.role
    });
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        //usuario.pass = null;
        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });
});

app.put('/usuario/:id', chekToken, function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        res.json({
            ok: true,
            user: usuarioDB
        });
    })
});

app.delete('/usuario/:id', chekToken, function(req, res) {
    let id = req.params.id;
    //Usuario.findByIdAndRemove(id, (err, usuarioDelete) => {
    let chageEstado = {
        estado: false
    };
    Usuario.findByIdAndUpdate(id, chageEstado, { new: true }, (err, usuarioDelete) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        if (usuarioDelete.estado === false) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El usuario ya no existe'
                }
            });
        };
        res.json({
            ok: true,
            usuarioDelete
        });
    })
});

module.exports = app;