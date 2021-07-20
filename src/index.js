import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, NavLink } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
import App from './components/App.jsx';
import reportWebVitals from './reportWebVitals';
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { AUTH_TOKEN } from './constants';
import AppContext from './AppContext';
import { avatarVar } from './cache';

const AppWrapper = (props) => {
  const [appState, setAppState] = useState({
    token: localStorage.getItem(AUTH_TOKEN),
  });

  useEffect(() => {
    if (appState.token) {
      localStorage.setItem(AUTH_TOKEN, appState.token);
    } else {
      localStorage.removeItem(AUTH_TOKEN);
    }
  }, [appState]);

  const httpLink = createHttpLink({
    uri: 'http://localhost:4000',
  });

  const authLink = setContext((_, { headers }) => {
    const { token } = appState;

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const wsLink = new WebSocketLink({
    uri: 'ws://localhost:4000/graphql',
    options: {
      reconnect: true,
      connectionParams: {
        authToken: appState.token,
      },
    },
  });

  const link = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    authLink.concat(httpLink)
  );

  const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache({
      typePolicies: {
        Link: {
          fields: {
            avatar: {
              read(_, { variables }) {
                return avatarVar();
              },
            },
          },
        },
        Query: {
          fields: {
            someField: {
              read() {
                return 'something';
              },
            },
          },
        },
      },
    }),
  });

  return (
    <ApolloProvider client={client}>
      <AppContext.Provider value={{ appState, setAppState }}>
        <App />
      </AppContext.Provider>
    </ApolloProvider>
  );
};

ReactDOM.render(
  <BrowserRouter>
    <AppWrapper />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
