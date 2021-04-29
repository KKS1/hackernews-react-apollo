import logo from "./../logo.svg";
import "./../styles/App.css";
import { Switch, Route } from "react-router-dom";
import CreateLink from "./CreateLink";
import LinkList from "./LinkList";
import Header from "./Header";
import Login from "./Login";

function App() {
  return (
    <div className="App">
      <h1>React Apollo GraphQL (Full Stack)</h1>
      <Header />
      <Switch>
        <Route exact path="/" component={LinkList} />
        <Route exact path="/create" component={CreateLink} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
