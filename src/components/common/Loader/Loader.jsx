import React from "react";

import "./Loader.css";

const Loader = () => {
  return (
    <div className='loading-overlay'>
      <div className='loading'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
