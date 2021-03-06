


import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Login } from "../components/auth/Login";
import { Register } from '../components/auth/Register';


export const AuthRouter = () => {

  const VERSION = process.env.REACT_APP_VERSION;

  return (
    <div className="auth__main-container row mp-0 justify-content-center">
      <div className="auth__container col-10 col-md-5 col-lg-3">
        <Routes>
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={ <Register />} />
          <Route path="/" element={ <Login /> } />
        </Routes>
      </div>

      <div className="text-center col-10 col-md-5 col-lg-4">
          <p className="m-0 mt-2 white-text">
              { VERSION }   
          </p>

          <p className="m-0 mt-2 white-text">
              <span>Developed by </span>
              <a href="https://www.linkedin.com/in/santiago-vespa-gutierrez-991bb518b/" target="_blank">
                   Santiago Vespa
              </a>
              
          </p>
          <p className="m-0 white-text">
              <span>Open source project: </span>
              <a href="https://github.com/santivespa/finances" target="_blank">
                  source code on GitHub.
              </a>

          </p>
        </div>
    </div>
  )
}
