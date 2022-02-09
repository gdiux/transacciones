const { Schema, model, connection } = require('mongoose');

const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(connection);

const TransactionSchema = Schema({

    transaction: {
        type: Number
    },
    codigo: {
        type: String
    },
    referencia: {
        type: String,
        require: true
    },
    xxx: {
        type: String
    },
    valor: {
        type: Number
    },
    aaa: {
        type: String
    },
    status:{
        type: Boolean,
        default: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }

});

TransactionSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.tid = _id;
    return object;

});

TransactionSchema.plugin(autoIncrement.plugin, {
    model: 'Transactions',
    field: 'transaction',
    startAt: process.env.TRANSACTION_INIT
});

module.exports = model('Transactions', TransactionSchema);