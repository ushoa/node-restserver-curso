const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
let Categoria = require('../models/categoria');
const { chekToken } = require('../middlewares/autenticacion');
let app = express();

app.get('/categoria', chekToken, (req, res) => {
    Categoria.find()
        .exec((err, categorias) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.json({
                ok: true,
                categorias
            });
        })
});
app.get('/categoria/:id', chekToken, function(req, res) {
    let id = req.params.id;
    Categoria.findById(id, (err, categoriadb) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        res.json({
            ok: true,
            categoria: categoriadb
        });
    })
});
app.post('/categoria', chekToken, function(req, res) {
    let body = req.body;
    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });
    categoria.save((err, categoriadb) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (categoriadb) {
            return res.json({
                ok: true,
                categoria: categoriadb
            });
        }
    });
});
app.put('/categoria/:id', chekToken, function(req, res) {
    let id = req.params.id;
    Categoria.findByIdAndUpdate(id, { descripcion: req.body.descripcion }, { new: true, runValidators: true, context: 'query' }, (err, categoriadb) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriadb) {
            return res.status(400).json({
                ok: false,
                menssage: 'No se encuentra la descripcion bajo ese Id.',
                err
            });
        }
        res.json({
            ok: true,
            categoria: categoriadb
        });
    });
});
app.delete('/categoria/:id', chekToken, function(req, res) {
    let todo = req.params;
    res.json({
        ok: true,
        todo
    });
});

module.exports = app;