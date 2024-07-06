const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    profilePicture: {
        type: String,
        default: ""
    },
    desc: {
        type: String,
        default: ""
    },
    isExpert: {
        type: Boolean,
        default: false
    },
    connecedExpert: {
        type: Array,
        default: []
    },
    connecedStudent: {
        type: Array,
        default: []
    },

}
    , { timestamps: true });
module.exports = mongoose.model("User", UserSchema);