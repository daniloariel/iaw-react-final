import React from 'react'
import { PatientsList } from "./PatientsList";
import { PatientForm } from "./PatientForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home = () => {
    return (
        <section className="home">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<PatientsList/>} />
        <Route path="add" element={<PatientForm/>} />
        <Route path="edit/:id" element={<PatientForm/>} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
    </BrowserRouter>
    </section>
    );
};

export default Home;