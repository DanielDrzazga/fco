require('dotenv').config();
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { Author, Book, User } = require('./models');

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Connection error:', error));

const typeDefs = `
    type Author {
        id: ID!
        name: String!
        bookCount: Int!
        born: Int
    }

    type Book {
        id: ID!
        title: String!
        author: Author!
        published: Int!
        genres: [String!]!
    }

    type User {
      id: ID!
      username: String!
      favoriteGenre: String!
    }

    type Token {
      value: String!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
        me: User
    }

    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ): Book!

        editAuthor(
            name: String!
            born: Int!
        ): Author

        createUser(
          username: String!
          favoriteGenre: String!
        ): User

        login(
          username: String!
          password: String!
        ): Token
    }
`;

const resolvers = {
  Query: {
    bookCount: async () => await Book.countDocuments(),
    authorCount: async () => await Author.countDocuments(),
    allBooks: async (root, args) => {
      let filter = {};

      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        if (!author) {
          return [];
        }
        filter.author = author.id;
      }

      if (args.genere) {
        filter.genres = args.genre;
      }

      return await Book.find(filter).populate('author');
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
    addBook: async (root, { title, author, published, genere }) => {
      let existingAuthor = await Author.findOne({ name: author });

      if (!author) {
        existingAuthor = new Author({ name: author });
        await existingAuthor.save();
      }

      const newBook = {
        title,
        author,
        published,
        genere,
      };

      await newBook.save();
      return newBook.populate('author');
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

      console.log(user)

      const token = jwt.sign(
        { id: user._id, username: user, username },
        process.env.JWT_SECRET
      );
      return { value: token };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.Authorization : null;

    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
