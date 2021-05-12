const mongoose = require('mongoose');
const Donor = require('./Donor.model');
const Brand = require('./Brand.model')
const Member = require('./Member.model')
const Category = require('./Category.model')
const  User = require('./User.model')

const  GE = require('./GE.model')

const FamilySchema = mongoose.Schema({
  family_id: {type:String,required:true,unique:true,enum:["NAP0101"]},
  donor: {
    type: mongoose.Types.ObjectId,
    ref: 'Donor',
  },
  brand: {
    type: mongoose.Types.ObjectId,
    ref: 'Brand',
  },
  member: {
    type: mongoose.Types.ObjectId,
    ref: 'Member',
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: 'Category',
  },
  GE: {
    type: mongoose.Types.ObjectId,
    //type:Number,
    ref: 'GE',
  },
  ownerId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },

  name: { type: String,required: true },
  wives: { type: Number,required: true },
  current_location: { type: String,required: true },
  mother: { type: String, enum: ["IaBata","IaWura"]},
  assets: { type: String,required: true,unique:true},
  description: { type: String},
  age: { type: String, enum: ["30", "70",'45','75','80','55'], required: true },
  createdAt: Date,
  updatedAt: Date ,

});

FamilySchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();
    // change the updated_at field to current date
    this.createdAt = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.updatedAt)
    this.updatedAt = currentDate;
    next();
    });
    


module.exports = mongoose.model('Family',FamilySchema);
