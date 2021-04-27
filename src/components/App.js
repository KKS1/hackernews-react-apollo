import logo from "./../logo.svg";
import "./../styles/App.css";
import CreateLink from "./CreateLink";
import LinkList from "./LinkList";

function App() {
  return (
    <div className="App1">
      <LinkList />
      {`\n`}
      <h3>Create Link Form</h3>
      <CreateLink />
    </div>
  );
}

export default App;
