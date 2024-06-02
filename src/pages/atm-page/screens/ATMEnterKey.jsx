import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import screenLogo from "assets/img/header.png";
import KeyPad from "components/common/KeyPad/KeyPad";
import { UserContext } from "context/UserContext";
import {
  ATM_APP_CASH_WITHDRAWAL,
  ATM_CASH_WITHDRAWAL,
  ATM_KEY,
} from "constants/defaultValue";

function ATMEnterKey() {
  const inputEl = useRef(null);
  const { operationType, playPressButtonSound } = useContext(UserContext);
  const [isKeyPadOpen, setIsKeyPadOpen] = useState(false);
  const [key, setKey] = useState("");
  const [errorInputMessage, setErrorInputMessage] = useState("");
  let navigate = useNavigate();

  const handleAddNumber = (num) => {
    setErrorInputMessage("");
    playPressButtonSound();

    if (inputEl.current.value.length < 4) {
      setKey(key + num);
      inputEl.current.value = inputEl.current.value + "X";
    }
  };

  const handleDeleteNumber = () => {
    playPressButtonSound();
    if (inputEl.current.value) {
      setKey(key.slice(0, -1));
      inputEl.current.value = inputEl.current.value.slice(0, -1);
    }
  };

  const validate = () => {
    if (inputEl.current.value.length < 4) {
      setErrorInputMessage("Ingrese 4 dígitos");
    } else {
      if (key === ATM_KEY) {
        if (
          operationType === ATM_CASH_WITHDRAWAL ||
          operationType === ATM_APP_CASH_WITHDRAWAL
        ) {
          navigate("/cajero-automatico/retirar-dinero");
        } else {
          navigate("/cajero-automatico/elige-una-opcion");
        }
      } else {
        navigate("/cajero-automatico/clave-erronea");
      }
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
          <div className="main-text">
            <h2>Por favor digita tu clave</h2>
            <input
              ref={inputEl}
              type="text"
              name="key"
              onFocus={() => {
                setIsKeyPadOpen(true);
              }}
            />
            {errorInputMessage && (
              <div className="text-danger">{errorInputMessage}</div>
            )}
            <p>clave: 1234</p>
          </div>

          <div className="bottom-text">
            <h2>Si no es correcta pulsa BORRAR o CORREGIR</h2>
          </div>
        </div>
        {isKeyPadOpen && (
          <KeyPad
            handleAddNumber={handleAddNumber}
            handleDeleteNumber={handleDeleteNumber}
            onClose={() => {
              playPressButtonSound();
              setIsKeyPadOpen(false);
              validate();
            }}
          />
        )}
      </div>
      <div className="buttons buttons-right">
        <button />
        <button />
        <button />
        <button />
      </div>
    </div>
  );
}

export default ATMEnterKey;
