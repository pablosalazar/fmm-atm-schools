import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import replayIcon from "assets/img/replayIcon.png";
import nextIcon from "assets/img/nextIcon.png";

import "./VideoPlayer.scss";
import ProgressbarLoader from "../progressbar-loader/ProgressbarLoader";

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}

const VideoPlayer = ({
  source,
  nextAction,
  isLoading,
  setIsLoading,
  ...rest
}) => {
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const videoRef = useRef();

  const playVideo = () => {
    videoRef.current.currentTime = 0;
    videoRef.current.play();
  };

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <>
      {isLoading && <ProgressbarLoader />}

      <div className='video-player'>
        <video
          ref={videoRef}
          autoPlay
          onLoadedData={() => {
            setIsLoading(false);
          }}
          style={{
            ...(windowSize.innerWidth > windowSize.innerHeight
              ? { height: "100%" }
              : { width: "100%" }),
          }}
          {...rest}
        >
          <source src={source} type='video/mp4' />
        </video>
        <div className='video-controls'>
          <button id='replay' type='button' onClick={playVideo}>
            <img src={replayIcon} alt='Replay video' />
          </button>

          <NavLink to={nextAction}>
            <img src={nextIcon} alt='Omitir intro' />
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default VideoPlayer;
