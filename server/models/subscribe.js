const mongoose = require('mongoose');
const { isEmail } = require('validator');
const SubsriberSchema = new mongoose.Schema(
    {email :
        {type :String,
            require:[true,"you cannot subscribe using this email"],
            validate:[isEmail,'Email is not valid.'],
            unique: true,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },}
);

module.exports = mongoose.model('Subscriber', SubsriberSchema);

