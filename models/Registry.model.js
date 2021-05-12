const mongoose = require('mongoose');
const Donor = require('./Donor.model');
const Staff= require('./Staff.model')
const Supplier = require('./Member.model')
const  User = require('./User.model')
const  GE = require('./GE.model')

const IdSchema = mongoose.Schema({

  family_id: { type: Number,required: true },
  name: { type: String,required: true },
  createdAt: Date,
  updatedAt: Date ,
  

});

IdSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();
    // change the updated_at field to current date
    this.createdAt = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.updatedAt)
    this.updatedAt = currentDate;
    next();
    });
    


module.exports = mongoose.model('Id',IdSchema);
