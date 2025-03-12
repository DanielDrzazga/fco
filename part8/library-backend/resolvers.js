const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const { Author, Book, User } = require('./models');

const resolvers = {
  Query: {
    bookCount: async () => await Book.countDocuments(),
    authorCount: async () => await Author.countDocuments(),
    allBooks: async (root, args) => {
      let filter = {};

      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        filter.author = author.id;
      }

      if (args.genre) {
        filter.genres = args.genre;
      }

      const books = await Book.find(filter).populate('author');

      return books.map(async (book) => ({
        id: book._id.toString(),
        title: book.title,
        published: book.published,
        genres: book.genres,
        author: {
          id: book.author._id.toString(),
          name: book.author.name,
          bookCount: await Book.countDocuments({ author: book.author.id }),
        },
      }));
    },
    allAuthors: async () => {
      const authors = await Author.find();
      return authors.map(async (author) => ({
        id: author.id,
        name: author.name,
        born: author.born || null,
        bookCount: await Book.countDocuments({ author: author.id }),
      }));
    },
    me: (root, args, context) => context.currentUser,
  },
  Mutation: {
    addBook: async (root, { title, author, published, genres }) => {
      let existingAuthor = await Author.findOne({ name: author });

      if (!existingAuthor) {
        existingAuthor = new Author({ name: author });
        await existingAuthor.save();
      }

      const newBook = new Book({
        title,
        author: existingAuthor._id,
        published,
        genres,
      });

      await newBook.save();

      const savedBook = await newBook.populate('author');

      pubsub.publish('BOOK_ADDED', { bookAdded: savedBook });

      return {
        ...savedBook.toObject(),
        author: {
          ...savedBook.author.toObject(),
          bookCount: await Book.countDocuments({ author: existingAuthor._id }),
        },
      };
    },
    editAuthor: async (root, { name, born }) => {
      const author = await Author.findOne({ name });

      if (!author) return null;

      author.born = born;
      await author.save();
      return author;
    },
    createUser: async (root, { username, favoriteGenre }) => {
      const existingUser = await User.findOne({ username });

      if (existingUser) throw new Error('User already exists');
      const passwordHash = await bcrypt.hash('admin', 10);

      const user = new User({
        username,
        favoriteGenre,
        passwordHash,
      });

      await user.save();
      return user;
    },
    login: async (root, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) throw new Error('Invalid username or password');

      const passwordValid = await bcrypt.compare(password, user.passwordHash);
      if (!passwordValid) throw new Error('Invalid username or password');

      console.log(user);

      const token = jwt.sign(
        { id: user._id, username: user, username },
        process.env.JWT_SECRET
      );
      return { value: token };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
};

module.exports = resolvers