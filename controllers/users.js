const User = require('../models/User');

// @desc    Get user
// @access  Private
exports.getUser = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (err) {
       console.log(`Error fetching standalone user\n ${err}`)
    }
}

// @desc    Add user
// @access  Private
exports.addUser = async (user) => {
    try {
        const _user = await User.create(user);
        console.log(`Adding standalone user\n ${_user._id}`)        
        return _user;
    } catch (err) {
        console.log(`Error adding standalone user\n ${err}`)        
    }
}