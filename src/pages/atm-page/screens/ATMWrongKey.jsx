import React, { useContext } from "react";

import screenLogo from "assets/img/header.png";

import errorIcon from "assets/img/error-icon.png";
import { UserContext } from "context/UserContext";

const ATMWrongKey = () => {
  const { setUser } = useContext(UserContext);

  const finish = () => {
    localStorage.removeItem("user");
    setUser(null);
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
            <img src={errorIcon} alt='error' className='mb-3' />
            <h2>Ingresaste una clave erronea</h2>

            <button className='btn btn-orange mt-3' onClick={finish}>
              Finalizar
            </button>
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

export default ATMWrongKey;
