import React from 'react'
import { PatientsList } from "./PatientsList";
import { PatientForm } from "./PatientForm";
import { PatientPressure } from "./PatientPressure";
import { PressureForm } from "./PressureForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home = () => {
  
    return (
      <section className="home">
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<PatientsList/>} />
              <Route path="/new" element={<PatientForm/>} />
              <Route path="edit/:id" element={<PatientForm/>} />
              <Route path="*" element={<h1>Not Found</h1>} />
              <Route path='patient/:id/pressures' element= {<PatientPressure/>}/>
              <Route path='patient/:id/pressure/new' element={<PressureForm/>}/>
              <Route path='patient/:id/pressure/:pressureId/edit' element={<PressureForm/>}/>
          </Routes>
        </BrowserRouter>
      </section>
    );
};

export default Home;