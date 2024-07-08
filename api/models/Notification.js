const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    toSend: {
        type: String
    },
    from: {
        type: String
    },
    text: {
        type: String
    },
    read: {
        type: Boolean,
        default: false
    }
}, 
{ timestamps: true }
);
module.exports = mongoose.model("Notification", NotificationSchema);