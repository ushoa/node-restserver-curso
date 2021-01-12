const jwt = require('jsonwebtoken');


let chekToken = (req, res, next) => {
    let token = req.get('token');
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err,
                hora: new Date(Date.now())
            });
        }
        req.usuario = decoded.usuario;
        console.log(token);
        next();
    })
}

module.exports = { chekToken };