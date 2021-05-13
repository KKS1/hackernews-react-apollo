import React, { useContext } from "react";
import logo from "./../logo.svg";
import "./../styles/App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import CreateLink from "./CreateLink";
import LinkList from "./LinkList";
import Header from "./Header";
import Login from "./Login";
import AppContext from "../AppContext";
import Search from "./Search";

function App() {
  const {
    appState: { token },
  } = useContext(AppContext);

  return (
    <div className="App">
      <h1>React Apollo GraphQL (Full Stack)</h1>
      <Header />
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/new/1" /> } />
        <Route exact path="/create" component={CreateLink} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/new/:page" component={LinkList} />
      </Switch>
    </div>
  );
}

export default App;
