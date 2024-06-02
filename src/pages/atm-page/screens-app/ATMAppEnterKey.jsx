import React, { useEffect, useRef, useState } from "react";

import screenLogo from "assets/img/header.png";

import PhoneKeyPad from "components/common/PhoneKeyPad/PhoneKeyPad";

import { useNavigate } from "react-router-dom";
import { ATM_KEY } from "constants/defaultValue";

const ATMAppEnterKey = () => {
  const [key, setKey] = useState("");
  const [errorInputMessage, setErrorInputMessage] = useState("");
  const inputEl = useRef(null);
  let navigate = useNavigate();

  const handleAddNumber = (num) => {
    setErrorInputMessage("");

    if (inputEl.current.value.length < 4) {
      setKey(key + num);
      inputEl.current.value = inputEl.current.value + "X";
    }
  };

  useEffect(() => {
    if (key.length === 4) {
      if (key === ATM_KEY) {
        navigate("/cajero-automatico/app-saldo-disponible");
      } else {
        setErrorInputMessage("Clave incorrecta");
      }
    }
  }, [key]);

  const handleDeleteNumber = () => {
    setErrorInputMessage("");
    if (inputEl.current.value) {
      setKey(key.slice(0, -1));
      inputEl.current.value = inputEl.current.value.slice(0, -1);
    }
  };

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
          <h2 className="mb-3">Escribe tu clave</h2>
          <input
            ref={inputEl}
            type="text"
            className="phone-input text-center text-key"
          />
          {errorInputMessage && (
            <div className="text-danger">{errorInputMessage}</div>
          )}
          <p>clave: 1234</p>
        </div>

        <PhoneKeyPad
          handleAddNumber={handleAddNumber}
          handleDeleteNumber={handleDeleteNumber}
        />
      </div>
    </div>
  );
};

export default ATMAppEnterKey;
