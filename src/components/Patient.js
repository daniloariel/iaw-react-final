
import { useNavigate } from "react-router-dom";

const Patient = (props) => {

    const patient = props.patient;
    const navigate = useNavigate();

    return (
        <div>
            <div>{patient.firstName}</div>
            <div>{patient.lastName}</div>
            <div>{patient.email}</div>
            <div>{patient.notes}</div>
            <div>ID: {patient.id}</div>
            <button onClick={ () => navigate('/edit/'+patient.id) }>Edit</button>
            <div>------------------</div>
            <br></br>
        </div>
        
    );

}

export default Patient;