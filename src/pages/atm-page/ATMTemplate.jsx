import React from "react";

import screenLogo from "assets/img/header.png";

import { NavLink } from "react-router-dom";

const ATMPage = () => {
  return (
    <div className='d-flex justify-content-between w-100'>
      <div className='buttons buttons-left'>
        <button />
        <button />
        <button />
        <button />
      </div>
      <div className='screen'>
        <div className='screen-logo text-center'>
          <img src={screenLogo} alt='logo screen' />

          <div className='main-text'>
            <h2>Por favor inserta tu tarjeta</h2>
            <NavLink
              to='/cajero-automatico/insertar-tarjeta'
              className='btn btn-orange'
            >
              Ingresar tarjeta
            </NavLink>
          </div>

          <div className='options'>
            <div className='options-left'>
              <h2>Retiro desde apliación</h2>
            </div>
            <div className='options-right'>
              <h2>Consultar saldo</h2>
              <h2>Retirar dinero</h2>
            </div>
          </div>
        </div>
      </div>
      <div className='buttons buttons-right'>
        <button />
        <button />
        <button />
        <button />
      </div>
    </div>
  );
};

export default ATMPage;
