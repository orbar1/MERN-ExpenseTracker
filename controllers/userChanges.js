const UserChanges = require('../models/UserChanges');

// @desc    Add user changes
// @access  Private
exports.addUserChanges = async (userId, transactionId) => {
    try {
        // const userChanges = await UserChanges.create({userId: userId, costId: transactionId})
        const userChanges = await UserChanges.findOne({userId: userId})
        if(userChanges){
            userChanges.costId.push(transactionId)
            userChanges.save()
            console.log(`Success updating user changes ${userChanges.id}`)
        }else{
            const userChanges = await UserChanges.create({userId: userId, costId: [transactionId]})
            console.log(`Success creating user changes ${userChanges.id}`)
        }
        
        return userChanges;
    } catch (err) {
       console.log(`Error adding standalone user\n ${err}`)
    }
}

// @desc    Delete user changes
// @access  Private
exports.deleteUserChanges = async (user, transaction) => {
    try {
        const userChanges = await UserChanges.find({userId: user, costId: transaction})
        if(userChanges.length > 0){
            await userChanges[0].remove();
            console.log(`Success deleting user changes ${userChanges[0].id}`)
        }        
        
    } catch (err) {
       console.log(`Error adding standalone user\n ${err}`)
    }
}