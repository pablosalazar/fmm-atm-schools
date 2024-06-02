import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import screenLogo from "assets/img/header.png";
import { UserContext } from "context/UserContext";

function ATMCheckCost() {
  const { playPressButtonSound } = useContext(UserContext);
  let navigate = useNavigate();

  const goToEnterKey = () => {
    playPressButtonSound();
    navigate("/cajero-automatico/ingresar-clave");
  };

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
            <h2>Esta operación puede tener costo</h2>
            <h2>¿desea conocerlo?</h2>
          </div>

          <div className='options'>
            <div className='options-left'></div>
            <div className='options-right'>
              <h2>Continuar operación</h2>
              <h2 className='disabled'>Consultar costo</h2>
            </div>
          </div>
        </div>
      </div>
      <div className='buttons buttons-right'>
        <button />
        <button />
        <button onClick={goToEnterKey} />
        <button />
      </div>
    </div>
  );
}

export default ATMCheckCost;
