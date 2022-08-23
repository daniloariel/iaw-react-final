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
  const pressuresCollection = "pressures";
  
  export const savePatient = (newPatient) => {
    addDoc(collection(db, patientCollection), newPatient);
  }
  
  export const updatePatient = (id, updatedFields) => {
    updateDoc(doc(db, patientCollection, id), updatedFields);
  }
  
  export const getPatients = () => getDocs(collection(db, patientCollection));
  
  export const getPatient = (id) => getDoc(doc(db, patientCollection, id));
  
  export const deletePatient = async (id) => deleteDoc(doc(db, patientCollection, id));

  export const getPressures = (id) => getDocs(collection(db, patientCollection, id, pressuresCollection));

  export const savePressure = (patient_id, newPressure) => {
    addDoc(collection(db, patientCollection, patient_id, pressuresCollection), newPressure);
  }

  export const getPressure = (patientId, pressureId) =>{
    return getDoc(doc(db, patientCollection, patientId, pressuresCollection, pressureId));
  }

  export const updatePressure = (patientId, pressureId, updatedFields) => {
    updateDoc(doc(db, patientCollection, patientId, pressuresCollection, pressureId), updatedFields);
  }

  export const deletePressure = (patientId,pressureId) => deleteDoc(doc(db, patientCollection, patientId, pressuresCollection, pressureId));