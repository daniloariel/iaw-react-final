import React, { useState, useEffect } from "react";

export const Navbar = (props) => {

    const initialState = {
        id:"",
        firstName: "",
        lastName: "",
        email: "",
        dob: "",
        notes: "",
        pressures_id: "",
    }

    const [patient, setPatient] = useState(initialState);

    return(
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="#">IAW APP</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item active">
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href={"/"}>Patients</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href={"/new"}>New Patient</a>
                    </li>
                </ul>
            </div>
        </nav>
    )

}
export default Navbar;