import React from "react";
import { Routes, Route } from "react-router-dom";
import IntroPage from "pages/intro-page/IntroPage";
import LoginPage from "pages/login-page/LoginPage";
import RegisterPage from "pages/register-page/RegisterPage";
import ATMPage from "pages/atm-page/ATMPage";
import { UserProvider } from "context/UserProvider";
import InfoPage from "pages/info-page/InfoPage";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Routes>
          <Route path="/" element={<IntroPage />} />
          <Route path="iniciar-sesion" element={<LoginPage />} />
          <Route path="registrar" element={<RegisterPage />} />
          <Route path="info" element={<InfoPage />} />
          <Route path="/cajero-automatico/*" element={<ATMPage />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
