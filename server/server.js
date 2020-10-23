// import express
const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');

// import ApolloServer
const { ApolloServer } = require('apollo-server-express');
// import typeDefs and resolver
const { typeDefs, resolvers } = require('./schemas');

const app = express();
const PORT = process.env.PORT || 3001;

// import the middleware function
const { authMiddleware } = require('./utils/auth');
// create a new Apollo server and pass in our schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});
// integrate Apollo server witht he express application as middleware
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

//-------------------------------- Serve up static assets -----------------------------------//
// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
  // log where we can go to test our GQL API
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
});
