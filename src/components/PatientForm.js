import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom";
import { getPatient, savePatient, updatePatient } from "../firebase/api";
import { toast } from "react-toastify";



export const PatientForm = (props) => {

    const initialState = {
        firstName: "",
        lastName: "",
        email: "",
        dob: "",
        notes: "",
    }

    const [patientRecord, setPatientRecord] = useState(initialState);

    const [loading, setLoading] = useState(false);

    const params = useParams();
    const navigate = useNavigate();
    
    const getPatientRecord = async (id) => {
        try {
          const doc = await getPatient(id);
          setPatientRecord({ ...doc.data() });
        } catch (error) {
          console.error(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        console.log("params",params);
        if(params.id){
            setLoading(true);
            getPatientRecord(params.id);
        }

    }, [params.id]);

    const handleInputChange = ({ target: { name, value } }) => {
        setPatientRecord({...patientRecord, [name]: value});
    };


    const verifyEmail = (email) => {
        return String(email).toLowerCase().match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!verifyEmail(patientRecord.email))
          return toast("invalid email", { type: "warning", autoClose: 1000 });
    
        if (!params.id) {
          await savePatient(patientRecord);
          toast("New Patient Record Added", {
            type: "success",
          });
        } else {
          await updatePatient(params.id, patientRecord);
          toast("Updated", {
            type: "success",
          });
        }
    
        // Clean Form
        setPatientRecord(initialState);
        navigate("/");
      };


    return loading ? (<div>loading...</div>) :(
        <div className="col-md-4 offset-md-4">
            <form onSubmit={handleSubmit} className="card card-body bg-secondary">
                <label htmlFor="Firstname">Patient Firstname:</label>
                <div className="input-group mb-3">
                    <div className="input-group-text bg-dark">
                        <i className="material-icons">person</i>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Firstname"
                        value={patientRecord.firstName}
                        name="firstName"
                        onChange={handleInputChange}
                    />
                </div>

                <label htmlFor="Lastname">Patient Lastname:</label>
                <div className="input-group mb-3">
                    <div className="input-group-text bg-dark">
                        <i className="material-icons">person</i>
                    </div>
                    <input
                        type="text"
                        value={patientRecord.lastName}
                        name="lastName"
                        placeholder="Lastname"
                        className="form-control"
                        onChange={handleInputChange}
                    />
                </div>

                <label htmlFor="Email">Patient Email:</label>
                <div className="input-group mb-3">
                    <div className="input-group-text bg-dark">
                        <i className="material-icons">email</i>
                    </div>
                    <input
                        type="text"
                        value={patientRecord.email}
                        name="email"
                        placeholder="Email"
                        className="form-control"
                        onChange={handleInputChange}
                    />
                </div>

                <label htmlFor="DOB">Date of Birth:</label>
                <div className="input-group mb-3">
                    <div className="input-group-text bg-dark">
                        <i className="material-icons">date_range</i>
                    </div>
                    <input
                        type="date"
                        value={patientRecord.dob}
                        name="dob"
                        placeholder="DoB"
                        className="form-control"
                        onChange={handleInputChange}
                    />
                </div>


                <label htmlFor="notes">Additional Notes:</label>
                <textarea
                    rows="3"
                    className="form-control mb-3"
                    placeholder="Write patientRecord's notes"
                    name="notes"
                    value={patientRecord.notes}
                    onChange={handleInputChange}
                ></textarea>

                <button
                    className="btn btn-primary btn-block"
                    disabled={!patientRecord.email || !patientRecord.firstName}
                >
                    {props.currentId === "" ? "Save" : "Update"}
                </button>
            </form>
        </div>
    );
}