import React, { useEffect, useState } from 'react';
import Patient from './Patient';
import { getPatients } from '../firebase/api';
import { getPressures } from "../firebase/api";
import { deletePressure, deletePatient } from "../firebase/api";


export const PatientsList = (props) => {

    const [patients, setPatients] = useState([]);

    const getPatientsCollection = async() => {
        const patientsCollection = await getPatients();
        const patientTemp = [];
        patientsCollection.docs.forEach(patient => {
            patientTemp.push({...patient.data(), id: patient.id});
        });
        setPatients(patientTemp);
    }

    useEffect(() => {
        getPatientsCollection();
    }, []);

    const refreshPatients = (id) => {
        let index = patients.findIndex(patient => patient.id == id);
        patients.splice(index,1);
        let newList = [...patients]
        setPatients(newList);  
    }

    const deletePatientRecord = async (patientId) => {

        try {

            deletePatient(patientId);

            const pressuresCollection = await getPressures(patientId);

            console.log(pressuresCollection);

            pressuresCollection.docs.forEach( pressure => {
              deletePressure(patientId, pressure.id);
            });

            refreshPatients(patientId);

          } catch (error) {
            console.error(error);
          }
       
    };

    return (
            <div className="col-md-10 offset-md-1">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">DOB</th>
                            <th scope="col">Email</th>
                            <th scope="col">Notes</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                            patients.map((patient,index)=>{
                                return(
                                    <Patient patient={patient} key={index} deletePatient= {deletePatientRecord}></Patient>
                                );
                            })
                    }
                    </tbody>
                </table>
            </div> 
    );
}

export default PatientsList;