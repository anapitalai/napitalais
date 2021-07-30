const mongoose = require('mongoose');

const Membership_id = require('./Membership_Id.model')
const  User = require('./User.model')


const ChildSchema = mongoose.Schema({
  name: { type: String,required: true },
  age: { type: Number,required: true },
  number_children: { type: String,required: true },
  ownerId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  membership_id: {
    type: mongoose.Types.ObjectId,
    ref: 'Membership_Id',
      },
  createdAt: Date,
  updatedAt: Date ,
  

});

ChildSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();
    // change the updated_at field to current date
    this.createdAt = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.updatedAt)
    this.updatedAt = currentDate;
    next();
    });
    


module.exports = mongoose.model('Child',ChildSchema);
