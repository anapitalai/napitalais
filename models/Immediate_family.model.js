const mongoose = require('mongoose');
const Spouse = require('./Spouse.model')
const Membership_id = require('./Membership_Id.model')
const Land = require('./Land.model')
const  User = require('./User.model')
const  Mother = require('./Mother.model')

const Immediate_familySchema = mongoose.Schema({
  membership_id: {
    type: mongoose.Types.ObjectId,
    ref: 'Membership_Id',
      },
  spouse: {
    type: mongoose.Types.ObjectId,
    ref: 'Spouse',
  },
  land: {
    type: mongoose.Types.ObjectId,
    ref: 'Land',
  },
  mother: {
    type: mongoose.Types.ObjectId,
    ref: 'Mother',
  },
  ownerId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  first_name: { type: String, required: true, unique: true },
  middle_name: { type: String, required: true, unique: false },
  last_name: { type: String, required: true, unique: false },
  current_location: { type: String,required: true },
  
  age: { type: Number, required: false },
  createdAt: Date,
  updatedAt: Date ,

});

Immediate_familySchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();
    // change the updated_at field to current date
    this.createdAt = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.updatedAt)
    this.updatedAt = currentDate;
    next();
    });
    


module.exports = mongoose.model('Immediate_family',Immediate_familySchema);
