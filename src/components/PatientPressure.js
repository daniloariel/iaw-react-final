import React, { useState, useEffect } from "react";
import { getPressures, getPatient } from '../firebase/api';
import { useParams, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export const PatientPressure = () => {

    const [pressures, setPressures] = useState([]);
    const [loading, setLoading] = useState(false);

    const params = useParams();
    const navigate = useNavigate();

    const getPatientPressures = async (id) => {

        try {
            const pressuresCollection = await getPressures(id);
            const pressuresTemp = [];
            pressuresCollection.docs.forEach( pressure => {
                pressuresTemp.push({...pressure.data(), id: pressure.id});
            } );

            setPressures(pressuresTemp);

          } catch (error) {
            console.error(error);
          }
          setLoading(false);
       
    };

    useEffect(() => {
        if(params.id){
            getPatientPressures(params.id);
            setLoading(true);
        }
    }, [params.id]);

    return loading ? (<div>loading...</div>) :(
       <div className="col-md-10 offset-md-1">
        <br/>
        <button className="btn btn-primary" onClick= {() => navigate('/patient/'+params.id+'/pressure/new') }>New Record</button>
        <br></br>
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Pressure</th>
                    <th scope="col">Date and Time</th>
                    <th scope="col">Notes</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
            {
                    pressures.map((pressure,index)=>{
                        return[
                            <tr key= {index}>
                                <th>{pressure.value}</th>
                                <th>{pressure.date}</th>
                                <th>{pressure.notes}</th>
                                <th><button className="btn btn-primary" onClick= {() => navigate('/patient/'+params.id+'/pressure/'+pressure.id+'/edit') }>Edit</button></th>
                            </tr>
                         ];
                    })
            }
            </tbody>
        </table>
       </div>
    );

}