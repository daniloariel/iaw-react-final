import React, { useEffect, useState } from 'react';
import Patient from './Patient';
import { collection, getDocs } from "firebase/firestore";
import { getPatients } from '../firebase/api';

export const PatientsList = (props) => {

    const [patients, setPatients] = useState([]);

    const getPatientsCollection = async() => {
        const patientsCollection = await getPatients();
        const patientTemp = [];
        patientsCollection.docs.forEach(patient => {
            patientTemp.push(patient.data());
        });
        setPatients(patientTemp);
        // console.log(patientsCollection.docs[0].data());
        //console.log(patients.firstName);
    }

    //ESTO ES IMPORTANTE PARA QUE EL CODIGO DE LA DB SE EJECUTE UNA SOLA VEZ Y NO CON CADA CAMBIO DE LA APP PARA QUE NO ME COBREN JAJA SALUDOS
    useEffect(() => {
        getPatientsCollection();
    }, []);

    //esto me salvo la vida ahre
    console.log("pepe",patients);
    const patientCards = patients.map((patient, index) => {
        return <Patient patient={patient} key={index} ></Patient>
    });

    return (
        <div>
            {patientCards}
        </div>
    );
}