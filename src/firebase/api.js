import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
  } from "firebase/firestore";
  
  import { db } from "./config";
  
  const patientCollection = "patients";

  
  const patientProvider = {
    patient:"",
    provider:""
  }
  
  export const savePatient = (newPatient) => {
    addDoc(collection(db, patientCollection), newPatient);
  }
  
  export const updatePatient = (id, updatedFields) => {
    updateDoc(doc(db, patientCollection, id), updatedFields);
  }
  
  export const updatePatientProvider = (id, email) => {
    updateDoc(doc(db, patientCollection, id), email);
  }
  
  export const getPatients = () => getDocs(collection(db, patientCollection));
  
  export const getPatient = (id) => getDoc(doc(db, patientCollection, id));
  
  export const deletePatient = (id) => deleteDoc(doc(db, patientCollection, id));
  