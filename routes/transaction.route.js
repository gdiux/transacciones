/** =====================================================================
 *  TRANSACTIONS ROUTER
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// CONTROLLER
const { getTransactions, createTransaction, getTransactionsDate } = require('../controllers/transaction.controller');

const router = Router();

/** =====================================================================
 *  GET TRANSACTIONS
=========================================================================*/
router.get('/', [], getTransactions);
/** =====================================================================
 *  GET TRANSACTIONS
=========================================================================*/
/** =====================================================================
 *  GET TRANSACTIONS DATE
=========================================================================*/
router.get('/date', [], getTransactionsDate);
/** =====================================================================
 *  GET TRANSACTIONS DATE
=========================================================================*/

/** =====================================================================
 *  CREATE TRANSACTION
=========================================================================*/
router.post('/', [
        check('referencia', 'El numero de referencia es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createTransaction
);
/** =====================================================================
 *  CREATE TRANSACTION
=========================================================================*/

// EXPORTS
module.exports = router;