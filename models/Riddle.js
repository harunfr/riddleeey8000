const mongoose = require('mongoose');

const RiddleSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: [true, 'Please provide riddle body!'],
      minLength: 10,
      maxlength: 200,
    },
    answer: {
      type: String,
      required: [true, 'Please provide answer of riddle!'],
      minLength: 3,
      maxlength: 15,
    },
    approved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Riddle', RiddleSchema);
