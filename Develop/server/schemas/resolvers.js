const User = require('../models/User');
const { signToken } = require('../utils/auth');

const { AuthenticationError } = require('apollo-server-express');
const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    me: async (parent, { username }, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          '-__v -password',
        );
        return userData;
      }
      throw new AuthenticationError('Not logged in');
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { user, token };
    },
    login: async (parent, { email, password }) => {
      // create new User with inputs
      const user = await User.findOne({ email });
      // check the to see whether this user exist
      if (!user) {
        throw new AuthenticationError('New to here? Please sign up first');
      }
      // check whether the password input is correct
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect password');
      }
      // if pass both checks above generate token
      const token = signToken(user);
      // return the user that just login
      return { user, token };
    },
  },
};
// export resolver
module.exports = resolvers;
