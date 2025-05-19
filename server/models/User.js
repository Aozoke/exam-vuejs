const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Role' 
  },
  profil: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Profil' 
  }
});

module.exports = mongoose.model('User', userSchema);