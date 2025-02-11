const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
  },
  published: {
    type: Number,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
  },
  genres: [{ type: String }],
});

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  born: {
    type: Number,
  },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  favoriteGenre: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
});

authorSchema.plugin(uniqueValidator);
bookSchema.plugin(uniqueValidator);
userSchema.plugin(uniqueValidator);

const Author = mongoose.model('Author', authorSchema);
const Book = mongoose.model('Book', bookSchema);
const User = mongoose.model('User', userSchema);

module.exports = { Author, Book, User };
