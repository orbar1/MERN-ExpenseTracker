const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserChangesSchema = new mongoose.Schema({
    userId: {
        type: String,
        trim: true,
        required: [true, 'Please add userId']
    },
    costId: 
         [{type: Schema.Types.ObjectId, ref:"Transaction"}]
});

module.exports = mongoose.model('UserChanges', UserChangesSchema);