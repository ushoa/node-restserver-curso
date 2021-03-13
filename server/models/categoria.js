const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    descripcion: {
        type: String,
        unique: true,
        required: [true, 'Descripcion necesaria']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
});

categoriaSchema.methods.toJSON = function() {
    let categoria = this;
    let categoriaObject = categoria.toObject();

    return categoriaObject;
}

categoriaSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' });
module.exports = mongoose.model('categoria', categoriaSchema);