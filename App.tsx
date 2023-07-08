import React from 'react';
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';
import Launches from './src/Launch';

const client = new ApolloClient({
  uri: 'https://spacex-production.up.railway.app/',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Launches />
    </ApolloProvider>
  );
};

export default App;
