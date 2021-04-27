import logo from "./../logo.svg";
import "./../styles/App.css";
import { Card, CardBody } from "reactstrap";
import { Switch, Route } from "react-router-dom";
import CreateLink from "./CreateLink";
import LinkList from "./LinkList";
import Header from "./Header";

const CreateLinkCard = (props) => (
  <Card className="mb-3">
    <CardBody>
      <CreateLink {...props} />
    </CardBody>
  </Card>
);

const FeedLinksCard = (props) => (
  <Card>
    <CardBody>
      <LinkList {...props} />
    </CardBody>
  </Card>
);

function App() {
  return (
    <div className="App1">
      <h1>Fulll Stach React Apollo GraphQL Application</h1>
      <Header />
      <Switch>
        <Route exact path="/" component={FeedLinksCard} />
        <Route exact path="/create" component={CreateLinkCard} />
      </Switch>
    </div>
  );
}

export default App;
