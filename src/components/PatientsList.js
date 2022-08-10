import React, { useEffect, useState } from 'react';
import Patient from './Patient';
import { getPatients } from '../firebase/api';

export const PatientsList = (props) => {

    const [patients, setPatients] = useState([]);

    const getPatientsCollection = async() => {
        const patientsCollection = await getPatients();
        const patientTemp = [];
        patientsCollection.docs.forEach(patient => {
            console.log(patient.id)
            patientTemp.push({...patient.data(), id: patient.id});
        });
        setPatients(patientTemp);
    }

    //ESTO ES IMPORTANTE PARA QUE EL CODIGO DE LA DB SE EJECUTE UNA SOLA VEZ Y NO CON CADA CAMBIO DE LA APP PARA QUE NO ME COBREN JAJA SALUDOS
    useEffect(() => {
        getPatientsCollection();
    }, []);

    //esto me salvo la vida ahre
    const patientCards = patients.map((patient, index) => {
        return <Patient patient={patient} key={index}></Patient>
    });

    return (
        <div>
            {patientCards}
        </div>
    );
}