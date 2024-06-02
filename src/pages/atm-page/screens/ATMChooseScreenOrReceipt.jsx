import React, { useContext } from "react";

import screenLogo from "assets/img/header.png";

import { useNavigate } from "react-router-dom";
import { UserContext } from "context/UserContext";

const ATMChooseScreenOrReceipt = () => {
  const { playPressButtonSound } = useContext(UserContext);
  let navigate = useNavigate();

  const goToFinish = () => {
    playPressButtonSound();
    navigate("/cajero-automatico/retirar-recibo");
  };

  const goToSeeInScreen = () => {
    playPressButtonSound();
    navigate("/cajero-automatico/ver-saldo");
  };

  return (
    <div className='d-flex justify-content-between w-100'>
      <div className='buttons buttons-left'>
        <button />
        <button />
        <button />
        <button onClick={goToFinish} />
      </div>
      <div className='screen'>
        <div className='screen-logo text-center'>
          <img src={screenLogo} alt='logo screen' />

          <div className='main-text'>
            <h2>Deseas imprimir el recibo </h2>
            <h2>o ver el resultado</h2>
            <h2>de tu operación en pantalla</h2>
          </div>

          <div className='options'>
            <div className='options-left'>
              <h2>Imprimir recibo</h2>
            </div>
            <div className='options-right'>
              <h2>Ver en pantalla</h2>
            </div>
          </div>
        </div>
      </div>
      <div className='buttons buttons-right'>
        <button />
        <button />
        <button />
        <button onClick={goToSeeInScreen} />
      </div>
    </div>
  );
};

export default ATMChooseScreenOrReceipt;
