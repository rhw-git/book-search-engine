const User = require('../models/User');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
  },
};
// export resolver
module.exports = resolvers;
