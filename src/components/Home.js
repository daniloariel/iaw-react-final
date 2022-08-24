import React from 'react'
import { PatientsList } from "./PatientsList";
import { PatientForm } from "./PatientForm";
import { PatientPressure } from "./PatientPressure";
import { PressureForm } from "./PressureForm";
import { Login } from "./Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { auth } from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";


const Home = () => {


  const [user, loading, error] = useAuthState(auth);

  if(loading) return <div>loading...</div>

  if (!user){
    return (
      <BrowserRouter>
          <Routes>
              <Route path= "*" element={<Login/>}/>
          </Routes>
        </BrowserRouter>
    );
  }else
    return (
      <section className="home">
        <BrowserRouter>
          <Routes>
              <Route path="/login" element={<Login/>}/>
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