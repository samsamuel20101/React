const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const photoSchema = new Schema({
  photoImage: {
    type: String,
    required: 'You need to upload a photo!',
    // minlength: 1,
    // maxlength: 280,
    // trim: true,
  },
  photoAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Photo = model('Photo', photoSchema);

module.exports = Photo;
