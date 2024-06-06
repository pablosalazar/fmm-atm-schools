import { UserContext } from "context/UserContext";
import React, { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ATMCheckBalance from "./screens/ATMCheckBalance";
import ATMCheckCost from "./screens/ATMCheckCost";
import ATMChooseScreenOrReceipt from "./screens/ATMChooseScreenOrReceipt";
import ATMEnterKey from "./screens/ATMEnterKey";
import ATMFinish from "./screens/ATMFinish";
import ATMGetMoney from "./screens/ATMGetMoney";
import ATMInsertCard from "./screens/ATMInsertCard";

import "./ATMPage.css";
import ATMSelectAccount from "./screens/ATMSelectAccount";
import ATMSelectMoney from "./screens/ATMSelectMoney";
import ATMStart from "./screens/ATMStart";
import ATMWrongKey from "./screens/ATMWrongKey";
import ATMAppStart from "./screens-app/ATMAppStart";
import ATMAppEnterKey from "./screens-app/ATMAppEnterKey";
import ATMAppAvailableBalance from "./screens-app/ATMAppAvailableBalance";

const ATMPage = () => {
  let navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true });
    }
  }, [user]);

  const logOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/", { replace: true });
  };

  return (
    <div className="atm-section">
      <header className="atm-header">
        <div className="container-fluid">
          <div onClick={logOut}>
            <i className="bi bi-box-arrow-in-left mr-5"></i>
            <span className="ml-5">Salir de la simulación</span>
          </div>
          <p>
            Bienvenido <span className="name">{user?.schoolName}</span>
            <i className="bi bi-person"></i>
          </p>
        </div>
      </header>
      <div className="atm">
        <Routes>
          <Route path="/" element={<ATMStart />} />
          <Route path="/insertar-tarjeta" element={<ATMInsertCard />} />
          <Route path="/seleccionar-cuenta" element={<ATMSelectAccount />} />
          <Route path="/seleccionar-cantidad" element={<ATMSelectMoney />} />
          <Route path="/consultar-costo" element={<ATMCheckCost />} />
          <Route path="/ingresar-clave" element={<ATMEnterKey />} />
          <Route path="/retirar-dinero" element={<ATMGetMoney />} />
          <Route path="/retirar-recibo" element={<ATMFinish />} />
          <Route path="/clave-erronea" element={<ATMWrongKey />} />
          <Route
            path="/elige-una-opcion"
            element={<ATMChooseScreenOrReceipt />}
          />
          <Route path="/ver-saldo" element={<ATMCheckBalance />} />
          {/* RETIRO DESDE MOVIL */}
          <Route path="/app" element={<ATMAppStart />} />
          <Route path="/app-ingresar-clave" element={<ATMAppEnterKey />} />
          <Route
            path="/app-saldo-disponible"
            element={<ATMAppAvailableBalance />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default ATMPage;
