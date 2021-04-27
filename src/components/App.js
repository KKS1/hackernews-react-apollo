import logo from "./../logo.svg";
import "./../styles/App.css";
import { Card, CardBody, CardHeader } from "reactstrap";
import CreateLink from "./CreateLink";
import LinkList from "./LinkList";

function App() {
  return (
    <div className="App1">
      <h1>Fulll Stach React Apollo GraphQL Application</h1>

      <Card className="mb-3">
        <CardHeader>Create Link Form</CardHeader>
        <CardBody>
          <CreateLink />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>Feed Links List</CardHeader>
        <CardBody>
          <LinkList />
        </CardBody>
      </Card>
    </div>
  );
}

export default App;
