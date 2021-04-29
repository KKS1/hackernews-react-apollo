import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, NavLink } from "react-router-dom";
import { setContext } from "@apollo/client/link/context";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.css";
import App from "./components/App.jsx";
import reportWebVitals from "./reportWebVitals";
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { AUTH_TOKEN } from "./constants";
import AppContext from "./AppContext";

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
    uri: "http://localhost:4000",
  });

  const authLink = setContext((_, { headers }) => {
    const { token } = appState;

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
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
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
