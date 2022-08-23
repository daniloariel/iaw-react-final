import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom";
import { getPressure, savePressure, updatePressure } from "../firebase/api";
import { toast } from "react-toastify";



export const PressureForm = (props) => {

    const initialState = {value: "", date: "",}

    const [pressure, setPressure] = useState(initialState);

    const navigate = useNavigate();
    const params = useParams();

    const getPatientPressures = async (patientId, pressureId) => {
        try {
            const doc = await getPressure(patientId, pressureId);
            setPressure({ ...doc.data() });
          } 
          catch (error) {
            console.error(error);
          }
    }
    
    const handleInputChange = ({ target: { name, value } }) => {
        setPressure({...pressure, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!params.pressureId) {
          await savePressure(params.id,pressure);
          toast("New Record Added", {
            type: "success",
          });
        } else {
          await updatePressure(params.id, params.pressureId, pressure);
          toast("Updated", {
            type: "success",
          });
        }
    
        // Clean Form
        setPressure(initialState);
        navigate("/patient/"+params.id+"/pressures");
      };

    useEffect(() => {
        if(params.pressureId){
            getPatientPressures(params.id,params.pressureId);
        }
    }, [params.id,params.pressureId]);

    return (
        <div className="col-md-4 offset-md-4">
            <form onSubmit={handleSubmit} className="card card-body bg-secondary">
                <div className="input-group mb-3">
                    <div className="input-group-text bg-light">
                        <i className="material-icons">Value</i>
                    </div>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="value"
                        value={pressure.value}
                        name="value"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-text bg-light">
                        <i className="material-icons">Date</i>
                    </div>
                    <input
                        type="date"
                        value={pressure.date}
                        name="date"
                        className="form-control"
                        onChange={handleInputChange}
                    />
                </div>
                <label htmlFor="notes">Notes:</label>
                <textarea
                    rows="3"
                    className="form-control mb-3"
                    placeholder="Write notes"
                    name="notes"
                    value={pressure.notes}
                    onChange={handleInputChange}
                ></textarea>

                <button
                    className="btn btn-primary"
                    disabled={!pressure.value || !pressure.date}
                >
                    {props.currentId === "" ? "Save" : "Update"}
                </button>
            </form>
        </div>
    );
}
export default PressureForm;