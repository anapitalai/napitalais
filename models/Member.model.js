const mongoose = require('mongoose');
const  User = require('./User.model')

const MemberSchema = mongoose.Schema({
    first_name:{type: String,required:true},
    // ownerId: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "User",
    //   },
    surname: {type: String},
    age:{type:Number},
    createdAt:Date,
    updatedAt:Date
});

MemberSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();
    // change the updated_at field to current date
    this.createdAt = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.updatedAt)
    this.updatedAt = currentDate;

    next();
    });
    


module.exports = mongoose.model('Member',MemberSchema);