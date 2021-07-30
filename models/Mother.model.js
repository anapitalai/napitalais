const mongoose = require('mongoose');
const  User = require('./User.model')
const Membership_Id = require('./Membership_Id.model')


const MotherSchema = mongoose.Schema({
   first_name: {type:Number,required:true,unique:true},
   middle_name: {type:Number,required:true,unique:true},
   last_name: {type:Number,required:true,unique:true},
  membership_id: {
    type: mongoose.Types.ObjectId,
    ref: 'Membership_Id',
      },
      ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    createdAt:Date,
    updatedAt:Date
});

MotherSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();
    // change the updated_at field to current date
    this.createdAt = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.updatedAt)
    this.updatedAt = currentDate;
    next();
    });
    


module.exports = mongoose.model('Mother',MotherSchema);
