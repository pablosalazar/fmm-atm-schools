import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import screenLogo from "assets/img/header.png";
import { UserContext } from "context/UserContext";

function ATMSelectMoney() {
  const { playPressButtonSound } = useContext(UserContext);
  let navigate = useNavigate();

  const goToCheckCost = () => {
    playPressButtonSound();
    navigate("/cajero-automatico/consultar-costo");
  };

  return (
    <div className='d-flex justify-content-between w-100'>
      <div className='buttons buttons-left'>
        <button />
        <button onClick={goToCheckCost} />
        <button />
        <button />
      </div>
      <div className='screen'>
        <div className='screen-logo text-center'>
          <img src={screenLogo} alt='logo screen' />
          <div className='main-text'>
            <h2>Selecciona valor a retirar</h2>
          </div>

          <div className='options'>
            <div className='options-left'>
              <h2 className='disabled'>$20.000</h2>
              <h2>$100.000</h2>
              <h2 className='disabled'>$300.000</h2>
              <h2 className='disabled'>$600.000</h2>
            </div>
            <div className='options-right'>
              <h2 className='disabled'>$50.000</h2>
              <h2 className='disabled'>$200.000</h2>
              <h2 className='disabled'>$400.000</h2>
              <h2 className='disabled'>Retirar valor diferente</h2>
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
}

export default ATMSelectMoney;
