const mongoose = require('mongoose');
const  User = require('./User.model')

const Membership_IdSchema = mongoose.Schema({
    membership_Id: {type:String,required:true,unique:true},
    Owner_Id: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
          },

    createdAt:Date,
    updatedAt:Date
});

Membership_IdSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();
    // change the updated_at field to current date
    this.createdAt = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.updatedAt)
    this.updatedAt = currentDate;

    next();
    });
    


module.exports = mongoose.model('Membership_Id',Membership_IdSchema);