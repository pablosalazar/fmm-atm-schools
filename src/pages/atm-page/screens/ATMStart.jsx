import React, { useContext, useEffect } from "react";

import screenLogo from "assets/img/header.png";
import { useNavigate } from "react-router-dom";
import { UserContext } from "context/UserContext";
import {
  ATM_APP_CASH_WITHDRAWAL,
  ATM_BALANCE_INQUIRY,
  ATM_CASH_WITHDRAWAL,
} from "constants/defaultValue";

const ATMStart = () => {
  const { setOperationType, setStartTime, playPressButtonSound } =
    useContext(UserContext);
  let navigate = useNavigate();

  useEffect(() => {
    setStartTime(new Date().getTime());
  }, []);

  const goToInsertCard = (operation) => {
    playPressButtonSound();
    setOperationType(operation);
    navigate("/cajero-automatico/insertar-tarjeta");
  };

  const goToApp = () => {
    playPressButtonSound();
    setOperationType(ATM_APP_CASH_WITHDRAWAL);
    navigate("/cajero-automatico/app");
  };

  return (
    <div className='d-flex justify-content-between w-100'>
      <div className='buttons buttons-left'>
        <button />
        <button />
        <button />
        <button onClick={goToApp} />
      </div>
      <div className='screen'>
        <div className='screen-logo text-center'>
          <img src={screenLogo} alt='logo screen' />

          <div className='options'>
            <div className='options-left'>
              <h2>Retiro desde aplicación</h2>
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
        <button onClick={() => goToInsertCard(ATM_BALANCE_INQUIRY)} />
        <button onClick={() => goToInsertCard(ATM_CASH_WITHDRAWAL)} />
      </div>
    </div>
  );
};

export default ATMStart;
