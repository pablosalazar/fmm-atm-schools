import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import screenLogo from "assets/img/header.png";

import Loader from "components/common/Loader/Loader";

import InfoIcon from "assets/img/info-icon.png";

import insertCardVideo from "assets/videos/insertar_tarjeta.mp4";

const ATMInsertCard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [wasVideoShowed, setWasVideoShowed] = useState(false);
  let navigate = useNavigate();

  const handleVideoPlay = () => {
    setIsLoading(false);
    setTimeout(() => {
      setWasVideoShowed(true);
    }, 2000);
  };

  useEffect(() => {
    if (wasVideoShowed) {
      setTimeout(() => {
        navigate("/cajero-automatico/seleccionar-cuenta");
      }, 5000);
    }
  }, [wasVideoShowed]);

  return (
    <>
      {showVideo && !wasVideoShowed ? (
        <div className="vh-100">
          {isLoading && <Loader />}
          <video
            autoPlay
            loop
            className="fmm-video"
            onLoadedData={handleVideoPlay}
          >
            <source src={insertCardVideo} type="video/mp4" />
          </video>
        </div>
      ) : (
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

              {wasVideoShowed ? (
                <div className="main-text">
                  <img src={InfoIcon} alt="info icon" className="mb-3" />
                  <h2>Por favor no retires tu tarjeta</h2>
                  <h2>hasta finalizar la transición</h2>
                </div>
              ) : (
                <div className="main-text">
                  <h2 className="mb-5">Por favor inserta tu tarjeta</h2>
                  <button
                    to="/cajero-automatico/insertar-tarjeta"
                    className="btn btn-orange"
                    onClick={() => setShowVideo(true)}
                  >
                    Click aquí para ingresar tu tarjeta
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="buttons buttons-right">
            <button />
            <button />
            <button />
            <button />
          </div>
        </div>
      )}
    </>
  );
};

export default ATMInsertCard;
