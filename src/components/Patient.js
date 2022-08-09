const Patient = (props) => {

    const patient = props.patient;
    return (
        <div>
            <div>{patient.firstName}</div>
            <div>{patient.lastName}</div>
            <div>{patient.email}</div>
            <div>{patient.notes}</div>
            <br></br>
        </div>
        
    );

}

export default Patient;