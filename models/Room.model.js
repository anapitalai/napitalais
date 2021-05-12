const mongoose = require('mongoose');
const Staff = require('./Staff.model')
const  User = require('./User.model')

const RoomSchema = mongoose.Schema({
    room:{type: String,required:true,unique:true},
    ownerId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    createdAt:Date,
    updatedAt:Date
});

RoomSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();
    // change the updated_at field to current date
    this.createdAt = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.updatedAt)
    this.updatedAt = currentDate;

    next();
    });
    


module.exports = mongoose.model('Room',RoomSchema);