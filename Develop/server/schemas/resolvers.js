const User = require('../models/User');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    me: async (parent, { username }) => {
      return await User.findOne({ username }).select('-__v -password');
    },
  },
};
// export resolver
module.exports = resolvers;
