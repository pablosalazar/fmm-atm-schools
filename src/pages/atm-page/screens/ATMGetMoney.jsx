import React, { useEffect, useState } from "react";

import screenLogo from "assets/img/header.png";

import Loader from "components/common/Loader/Loader";
import { useNavigate } from "react-router-dom";
import getMoneyVideo from "assets/videos/retirar_dinero_sin_recibo.mp4";

const ATMGetMoney = () => {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowVideo(true);
    }, 4000);
  }, []);

  const handleVideoPlay = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (showVideo) {
      setTimeout(() => {
        navigate("/cajero-automatico/elige-una-opcion");
      }, 9000);
    }
  }, [showVideo]);

  return (
    <>
      {showVideo ? (
        <div className="vh-100">
          {isLoading && <Loader />}
          <video
            autoPlay
            loop
            className="fmm-video"
            onLoadedData={handleVideoPlay}
          >
            <source src={getMoneyVideo} type="video/mp4" />
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

              <div className="main-text">
                <h2>TRANSICIÓN EN PROCESO ESPERE UN MOMENTO POR FAVOR...</h2>
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
      )}
    </>
  );
};

export default ATMGetMoney;
