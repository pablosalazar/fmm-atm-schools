import React, { useContext, useState } from "react";

import { UserContext } from "context/UserContext";
import { registerActivity } from "service/activity.service";
import Loader from "components/common/Loader/Loader";

import printTicketVideo from "assets/videos/retirar_recibo.mp4";

const ATMFinish = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const { user, setUser, startTime, operationType } = useContext(UserContext);

  const save = async () => {
    const endTime = new Date().getTime();

    const elapsedTime = endTime - startTime;

    if (!isNaN(elapsedTime)) {
      setIsLoading(true);
      await registerActivity({
        activity: operationType,
        documentNumber: user.documentNumber,
        elapsedTime,
      });
      logOut();
    } else {
      logOut();
    }
  };

  const logOut = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const handleVideoPlay = () => {
    setIsLoading(false);
    setTimeout(() => {
      setShowButton(true);
    }, 2000);
  };

  return (
    <div className="vh-100">
      {isLoading && <Loader />}
      <video autoPlay className="fmm-video" onLoadedData={handleVideoPlay}>
        <source src={printTicketVideo} type="video/mp4" />
      </video>
      {showButton && (
        <div className="bottom-text">
          <button className="btn btn-orange mt-5" onClick={save}>
            Finalizar
          </button>
        </div>
      )}
    </div>
  );
};

export default ATMFinish;
