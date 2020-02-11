const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({

  type: String,
  number: Number,
  
  available: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },

  checkin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Room', roomSchema);