const { response } = require('express');

const Transaction = require('../models/transactions.model');

/** =====================================================================
 *  GET TRANSACTIONS
=========================================================================*/
const getTransactions = async(req, res = response) => {

    try {

        const desde = Number(req.query.desde) || 0;
        const limit = Number(req.query.limite) || 1000;

        const [transactions, total] = await Promise.all([

            Transaction.find()
            .skip(desde)
            .limit(limit)
            .sort({transaction: -1}),
            Transaction.countDocuments()
        ]);

        res.json({
            ok: true,
            transactions,
            total
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente de nuevo'
        });

    }

};
/** =====================================================================
 *  GET TRANSACTIONS
=========================================================================*/
/** =====================================================================
 *  GET TRANSACTIONS FOR DATE
=========================================================================*/
const getTransactionsDate = async( req, res = response ) => {

    try {
        const initial = req.query.initial;
        const end = req.query.end;
        const status = req.query.status || true;

        const [transactions, total] = await Promise.all([

            Transaction.find({
                $and: [{ fecha: { $gte: new Date(initial), $lt: new Date(end) } }],
                status
            })
            .sort({transaction: -1}),
            Transaction.countDocuments()
            
        ]);

        res.json({
            ok: true,
            transactions,
            total
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente de nuevo'
        });
    }

};


/** =====================================================================
 *  GET TRANSACTIONS FOR DATE
=========================================================================*/

/** =====================================================================
 *  CREATE TRASACTION
=========================================================================*/
const createTransaction = async(req, res = response) => {

    const referencia = req.body.referencia;

    try {

        // VALIDATE REFERENCIA
        const validarReferencia = await Transaction.findOne({ referencia });
        if (validarReferencia) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe una transacción con este numero de referencia'
            });
        }

        // SAVE TRASACTION
        const transaction = new Transaction(req.body);
        await transaction.save();

        res.json({
            ok: true,
            transaction
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });
    }

};
/** =====================================================================
 *  CREATE TRASACTION
=========================================================================*/

// EXPORTS
module.exports = {
    getTransactions,
    getTransactionsDate,
    createTransaction
};