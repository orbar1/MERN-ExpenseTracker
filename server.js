const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const userCtrl = require('./controllers/users');
const UserChanges = require('./models/UserChanges');
const Transaction = require('./models/Transaction');
const mongoose = require('mongoose');
mongoose.set('debug',true)
dotenv.config({ path: './config/config.env' });

connectDB();

const transactions = require('./routes/transactions');
const reports = require('./routes/report');

const app = express();

app.use(express.json());

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/v1/transactions', transactions);
app.use('/api/v1/reports', reports);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
    if(userCtrl.getUser().length == 0){
        userCtrl.addUser({firstName:'admin', lastName:'admin'})
    }
}

async function removeme(){
    await UserChanges.find({}).populate({path:'costId'}).exec(function (err, changes){
        console.log(changes);
        if(changes.length>0){           
            for(var change of changes){               
                for(var tx of change.costId){                   
                    console.log(tx)
                    console.log(new Date(Date.parse("2021-09-22T17:26:59.115Z")).getMonth()+1)
                }
            }
        }
    })
//    var res =  await Transaction.aggregate([
//        {
//            $group:{
//            _id:{$month:'createdAt'},
//            count:{$sum:1}
//             }
//         }]).exec(function (err, person) {
//         if (err) console.log(err);
//         console.log(person);
//         //console.log(JSON.stringify(person[0].costId[0]))
//       });
     
}
removeme()

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));