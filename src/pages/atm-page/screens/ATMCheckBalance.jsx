import React, { useContext, useState } from "react";

import screenLogo from "assets/img/header.png";

import { UserContext } from "context/UserContext";
import { registerActivity } from "service/activity.service";
import Loader from "components/common/Loader/Loader";
import { useNavigate } from "react-router-dom";

const ATMCheckBalance = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser, startTime, operationType } = useContext(UserContext);
  const [error, setError] = useState(false);

  let navigate = useNavigate();

  const save = async () => {
    const endTime = new Date().getTime();

    const elapsedTime = endTime - startTime;

    if (!isNaN(elapsedTime)) {
      setIsLoading(true);
      try {
        await registerActivity({
          studentId: user.id,
          activity: operationType,
          elapsedTime,
        });
        // navigate("/cajero-automatico");
        logOut();
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    } else {
      logOut();
    }
  };

  const logOut = () => {
    localStorage.removeItem("user");
    setUser(null);
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
          {isLoading && <Loader />}
          <div className="main-text">
            <h2>El saldo de tu cuenta de ahorros es:</h2>
            <h2>1.000.000</h2>
            <button className="btn btn-orange mt-2 mb-3" onClick={save}>
              Finalizar
            </button>
            {error && (
              <div className="alert alert-warning">
                Hubo un error, sal del simulador y vuelve a ingresar
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="buttons buttons-right">
        <button />
        <button />
        <button />
        <button />
      </div>
    </div>
  );
};

export default ATMCheckBalance;
