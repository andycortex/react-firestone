import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button } from "react-bootstrap";
import PersonDataService from "../services/person.service";

const CreatePerson = ({ id, setPersonId }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [fnac, setFnac] = useState("");
  const [fins, setFins] = useState("");
  const [cost, setCost] = useState(0);
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (age < 18 || name.length > 4 ){
      setMessage({ error: true, msg: "tiene que ser mayor de edad y el nombre tiene que contener mas de 4 caracteres" });
      return;
    }
    const newPerson = {
      name,
      age,
      fnac,
      fins,
      cost,
    };
    console.log(newPerson);

    try {
      if (id !== undefined && id !== "") {
        await PersonDataService.updatePerson(id, newPerson);
        setPersonId("");
        setMessage({ error: false, msg: "Updated successfully!" });
      } else {
        await PersonDataService.addPerson(newPerson);
        setMessage({ error: false, msg: "New Person added successfully!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setName("");
    setAge("");
    setFnac("");
    setFins("");
    setCost(0);
  };

  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await PersonDataService.getPerson(id);
      console.log("the record is :", docSnap.data());
      setName(docSnap.data().name);
      setAge(docSnap.data().age);
      setFnac(docSnap.data().fnac);
      setFins(docSnap.data().fins);
      setCost(docSnap.data().cost);
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  useEffect(() => {
    console.log("The id here is : ", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);
  return (
    <>
      <div className="p-4 box">
        {message?.msg && (
          <Alert
            variant={message?.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formPersonTitle">
            <InputGroup>
              <InputGroup.Text id="formBookTitle">B</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBookAuthor">
            <InputGroup>
              <InputGroup.Text id="formBookAuthor">A</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Edad"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBookAuthor">
            <InputGroup>
              <InputGroup.Text id="formBookAuthor">A</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Edad"
                value={fnac}
                onChange={(e) => setFnac(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBookAuthor">
            <InputGroup>
              <InputGroup.Text id="formBookAuthor">A</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Edad"
                value={fins}
                onChange={(e) => setFins(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBookAuthor">
            <InputGroup>
              <InputGroup.Text id="formBookAuthor">A</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Edad"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Add/ Update
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default CreatePerson;
