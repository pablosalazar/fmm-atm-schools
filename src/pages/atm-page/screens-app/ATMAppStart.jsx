import React, { useContext } from "react";

import screenLogo from "assets/img/header.png";

import PhoneKeyPad from "components/common/PhoneKeyPad/PhoneKeyPad";
import { UserContext } from "context/UserContext";
import { NavLink } from "react-router-dom";

const ATMAppStart = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="d-flex justify-content-between w-100">
      <div className="buttons buttons-left">
        <button />
        <button />
        <button />
        <button />
      </div>
      <div className="screen">
        <div className="screen-logo text-center">
          <img src={screenLogo} alt="logo screen" />
        </div>
      </div>
      <div className="buttons buttons-right">
        <button />
        <button />
        <button />
        <button />
      </div>
      <div className="phone-container">
        <div className="phone-content">
          <h2 className="mb-3">Ingrese su teléfono</h2>
          <input
            type="text"
            value="310 123 1234"
            className="phone-input"
            disabled
          />
          <br />
          <NavLink
            to="/cajero-automatico/app-ingresar-clave"
            className="btn btn-app mt-4"
          >
            Entrar
          </NavLink>
        </div>

        <PhoneKeyPad />
      </div>
    </div>
  );
};

export default ATMAppStart;
