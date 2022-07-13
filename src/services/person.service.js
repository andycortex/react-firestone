import { db } from "../firebase-config";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const personCollectionRef = collection(db, "person");
class PersonDataService {
  addPerson = (newPerson) => {
    return addDoc(personCollectionRef, newPerson);
  };

  updatePerson = (id, updatedPerson) => {
    const personDoc = doc(db, "person", id);
    return updateDoc(personDoc, updatedPerson);
  };

  deletePerson = (id) => {
    const personDoc = doc(db, "person", id);
    return deleteDoc(personDoc);
  };

  getAllPersons = () => {
    return getDocs(personCollectionRef);
  };

  getPerson = (id) => {
    const personDoc = doc(db, "person", id);
    return getDoc(personDoc);
  };
}

export default new PersonDataService();