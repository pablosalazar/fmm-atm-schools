import React from "react";

import screenLogo from "assets/img/header.png";
import { NavLink } from "react-router-dom";

const ATMAppAvailableBalance = () => {
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
        </div>
      </div>
      <div className='buttons buttons-right'>
        <button />
        <button />
        <button />
        <button />
      </div>
      <div className='phone-container'>
        <div className='phone-content'>
          <h4>Saldo disponible</h4>
          <h1>$1.100.000</h1>
          <NavLink
            to='/cajero-automatico/seleccionar-cuenta'
            className='btn btn-app'
          >
            Retirar desde cajero
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ATMAppAvailableBalance;
