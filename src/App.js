import { useState } from "react";
import CreatePerson from "./components/CreatePerson";
import PersonList from "./components/PersonList";


function App() {
  const [personId, setPersonId] = useState("");
  const getPersonIdHandler = (id) => {
    console.log("The ID of document to be edited: ", id);
    setPersonId(id);
  };
  return (
    <div>
      <CreatePerson id={personId} setBookId={setPersonId} />
      <PersonList getPersonId={getPersonIdHandler} />
    </div>
  );
}

export default App;
