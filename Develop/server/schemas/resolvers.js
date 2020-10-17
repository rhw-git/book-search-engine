const resolvers = {
  Query: {
    helloWorld: () => {
      return 'Hello World!';
    },
  },
};
// export resolver
module.exports = resolvers;
