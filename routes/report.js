const express = require('express');
const UserChanges = require('../models/UserChanges')
const router = express.Router();

async function generateReport(req, res, next) {
    await UserChanges.find({}).populate({ path: 'costId' }).exec(function (err, changes) {
        console.log("hhhhhhhhhh");
        console.log(req.body.month)
        
        var transactions = []
        if (changes.length > 0) {
            for (var change of changes) {
                for (var tx of change.costId) {
                    console.log(new Date(Date.parse(tx.createdAt)).getMonth() + 1)
                    if (new Date(Date.parse(tx.createdAt)).getMonth() + 1 == req.body.month){
                        transactions.push({transaction:tx, userId: change.userId})
                    }
                }
            }
            return res.status(201).json({
                success: true,
                data: transactions
            });
        }
    })
}

router
    .route('/')
    .post(generateReport);
module.exports = router;