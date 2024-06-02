import React from "react";
import coinsLoader from "assets/img/coins-loader.png";

import "./ProgressbarLoader.scss";

const ProgressbarLoader = () => {
  return (
    <div className='loader'>
      <div className='loader-inner'>
        <h2>CARGANDO...</h2>
        <div className='loader-icon'>
          <img src={coinsLoader} alt='' />
          <div className='progress'>
            <div className='progress-value'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressbarLoader;
