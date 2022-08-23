import { useNavigate } from "react-router-dom";

const Patient = (props) => {

    const patient = props.patient;
    const navigate = useNavigate();

    return (
        <tr>
            <th>{patient.firstName}</th>
            <th>{patient.lastName}</th>
            <th>{patient.dob}</th>
            <th>{patient.email}</th>
            <th>{patient.notes}</th>
            <th><button className="btn btn-primary" onClick={ () => navigate('patient/'+patient.id+'/pressures' ) }>Blood Pressure history</button></th>
            <th><button className="btn btn-primary" onClick={ () => navigate('/edit/'+patient.id) }>Edit</button></th>
            <th><button className="btn btn-danger" onClick={() => props.deletePatient(patient.id) }>Delete</button></th>
        </tr>
        
    );

}

export default Patient;