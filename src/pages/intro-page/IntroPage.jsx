import React, { useState } from "react";

import "./IntroPage.css";
import ProgressbarLoader from "components/common/progressbar-loader/ProgressbarLoader";
import VideoPlayer from "components/common/video-player/VideoPlayer";

import IntroVideo from "assets/videos/Intro.mp4";

const IntroPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <ProgressbarLoader />}

      <VideoPlayer
        source={IntroVideo}
        nextAction="/iniciar-sesion"
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        loop
      />
    </>
  );
};

export default IntroPage;
