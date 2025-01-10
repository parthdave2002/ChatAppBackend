const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    phone: { 
        type: String, 
    },
    gender: { 
        type: String, 
    },
    profile_pic: { 
        type: String,
        default: null 
    },
    password: { 
        type: String, 
        required: true
    },
    token: { 
        type: String, 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
});

const User = mongoose.model('user', userSchema);
module.exports = User;