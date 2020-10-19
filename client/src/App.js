// import react
import React from 'react';
// add these two library import statements
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
// import BrowerRouter as Router
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import pages
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import NoMatch from './pages/NoMatch';
// import components
import Navbar from './components/Navbar';

// connect to backend server's
const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token');
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });
  },
  uri: '/graphql',
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path="/" component={SearchBooks} />
            <Route exact path="/saved" component={SavedBooks} />
            <Route component={NoMatch} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
