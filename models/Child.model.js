const mongoose = require('mongoose');

const Membership_id = require('./Membership_Id.model')
const  User = require('./User.model')


const ChildSchema = mongoose.Schema({
  first_name: { type: String, required: true, unique: true },
  middle_name: { type: String, required: true, unique: false },
  last_name: { type: String, required: true, unique: false },
  age: { type: Number,required: true },
  number_children: { type: Number,required: false },
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
