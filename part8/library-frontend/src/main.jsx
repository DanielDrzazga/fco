import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
  headers: {
    authorization: localStorage.getItem('user-token')
      ? `Bearer ${localStorage.getItem('user-token')}`
      : '',
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
