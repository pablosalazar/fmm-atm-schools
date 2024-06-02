import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import screenLogo from "assets/img/header.png";
import { UserContext } from "context/UserContext";
import {
  ATM_APP_CASH_WITHDRAWAL,
  ATM_BALANCE_INQUIRY,
  ATM_CASH_WITHDRAWAL,
} from "constants/defaultValue";

function ATMSelectAccount() {
  const { operationType, playPressButtonSound } = useContext(UserContext);
  let navigate = useNavigate();

  const goToSelectMoney = () => {
    playPressButtonSound();
    navigate("/cajero-automatico/seleccionar-cantidad");
  };

  const goToEnterKey = () => {
    playPressButtonSound();
    navigate("/cajero-automatico/ingresar-clave");
  };

  return (
    <div className='d-flex justify-content-between w-100'>
      <div className='buttons buttons-left'>
        <button />
        {operationType === ATM_CASH_WITHDRAWAL ||
        operationType === ATM_APP_CASH_WITHDRAWAL ? (
          <button onClick={goToSelectMoney} />
        ) : (
          <button />
        )}
        <button />
        <button />
      </div>
      <div className='screen'>
        <div className='screen-logo text-center'>
          <img src={screenLogo} alt='logo screen' />
          <div className='main-text'>
            <h2>Selecciona tu transacción</h2>
          </div>

          <div className='options'>
            <div className='options-left'>
              <h2 className='disabled'>Retiro cuenta corriente</h2>
              <h2
                className={
                  operationType === ATM_CASH_WITHDRAWAL ||
                  operationType === ATM_APP_CASH_WITHDRAWAL
                    ? ""
                    : "disabled"
                }
              >
                Retiro cuenta de ahorros
              </h2>
              <h2 className='disabled'>Transferancias</h2>
              <h2 className='disabled'>Cambio de clave</h2>
            </div>
            <div className='options-right'>
              <h2 className='disabled'>Saldo cuenta corriente</h2>
              <h2
                className={
                  operationType === ATM_BALANCE_INQUIRY ? "" : "disabled"
                }
              >
                Saldo cuenta de ahorros
              </h2>
              <h2 className='disabled'>Retiro ahorro a la mano</h2>
              <h2 className='disabled'>Otras transacciones</h2>
            </div>
          </div>
        </div>
      </div>
      <div className='buttons buttons-right'>
        <button />
        {operationType === ATM_BALANCE_INQUIRY ? (
          <button onClick={goToEnterKey} />
        ) : (
          <button />
        )}
        <button />
        <button />
      </div>
    </div>
  );
}

export default ATMSelectAccount;
