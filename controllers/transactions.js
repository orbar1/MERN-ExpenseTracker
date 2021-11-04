const Transaction = require('../models/Transaction');
const UserCtrl = require('./users');
const UserChangesCtrl = require('./userChanges');

// @desc    Get all transactions
// @route   GET /api/v1/transactions
// @access  Public
exports.getTransactions = async (req, res, next) => {
    try {
        const transactions = await Transaction.find();        
        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

// @desc    Add transaction
// @route   POST /api/v1/transactions
// @access  Public
exports.addTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.create(req.body);

        const user = await UserCtrl.getUser()
        if(user.length > 0){            
            console.log(`Fetched user ${user[0]._id}`)
            await UserChangesCtrl.addUserChanges(user[0].id, transaction.id)
        }else{
            console.log("Standalone user cannot be found");
        }
       
        return res.status(201).json({
            success: true,
            data: transaction
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message)

            return res.status(400).json({
                success: false,
                error: messages
            });
        } else {
            res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
}

// @desc    Delete transaction
// @route   DELETE /api/v1/transactions/:id
// @access  Public
exports.deleteTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        const user = await UserCtrl.getUser();
        if(user.length == 0){
            console.log("Standalone user cannot be found");
        }
        if (!transaction) {
            return res.status(404).json({
                success: false,
                error: 'No transaction found'
            });
        }
        await transaction.remove();
        await UserChangesCtrl.deleteUserChanges(user[0].id, transaction.id)
        console.log(`Success deleting transation ${transaction.id}`)
        return res.status(200).json({
            success: true,
            data: {}
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}