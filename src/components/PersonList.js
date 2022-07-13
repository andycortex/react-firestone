import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import PersonDataService from "../services/person.service";

const PersonList = ({ getPersonId }) => {
  const [persons, setPersons] = useState([]);
  useEffect(() => {
    getPersons();
  }, []);

  const getPersons = async () => {
    const data = await PersonDataService.getAllPersons();
    console.log(data.docs);
    setPersons(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    await PersonDataService.deletePerson(id);
    getPersons();
  };
  return (
    <>
      <div className="mb-2">
        <Button variant="dark edit" onClick={getPersons}>
          Refresh List
        </Button>
      </div>

      {/* <pre>{JSON.stringify(persons, undefined, 2)}</pre> */}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Fecha de Nacimiento</th>
            <th>Fecha de Insripcion</th>
            <th>Costo</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((doc, index) => {
            return (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.name}</td>
                <td>{doc.age}</td>
                <td>{doc.fnac}</td>
                <td>{doc.fins}</td>
                <td>{doc.cost}</td>
                <td>
                  <Button
                    variant="secondary"
                    className="edit"
                    onClick={(e) => getPersonId(doc.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="delete"
                    onClick={(e) => deleteHandler(doc.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default PersonList;
