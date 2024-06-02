import React from "react";

import "./PhoneKeyPad.css";

import { ReactComponent as DeleteIcon } from "assets/img/delete-icon.svg";

const PhoneKeyPad = ({ handleAddNumber, handleDeleteNumber }) => {
  return (
    <div className='phone-keypad btn-group-vertical ml-4 mt-4' role='group'>
      <div className='btn-group'>
        <button
          type='button'
          className='btn btn-phone-keypad'
          onClick={() => handleAddNumber(1)}
        >
          1
        </button>
        <button
          type='button'
          className='btn btn-phone-keypad'
          onClick={() => handleAddNumber(2)}
        >
          2
        </button>
        <button
          type='button'
          className='btn btn-phone-keypad'
          onClick={() => handleAddNumber(3)}
        >
          3
        </button>
      </div>
      <div className='btn-group'>
        <button
          type='button'
          className='btn btn-phone-keypad'
          onClick={() => handleAddNumber(4)}
        >
          4
        </button>
        <button
          type='button'
          className='btn btn-phone-keypad'
          onClick={() => handleAddNumber(5)}
        >
          5
        </button>
        <button
          type='button'
          className='btn btn-phone-keypad'
          onClick={() => handleAddNumber(6)}
        >
          6
        </button>
      </div>
      <div className='btn-group'>
        <button
          type='button'
          className='btn btn-phone-keypad'
          onClick={() => handleAddNumber(7)}
        >
          7
        </button>
        <button
          type='button'
          className='btn btn-phone-keypad'
          onClick={() => handleAddNumber(8)}
        >
          8
        </button>
        <button
          type='button'
          className='btn btn-phone-keypad'
          onClick={() => handleAddNumber(9)}
        >
          9
        </button>
      </div>
      <div className='btn-group'>
        <button type='button' className='btn btn-phone-keypad'></button>

        <button
          type='button'
          className='btn btn-phone-keypad'
          onClick={() => handleAddNumber(0)}
        >
          0
        </button>
        <button
          type='button'
          className='btn btn-phone-keypad'
          onClick={handleDeleteNumber}
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default PhoneKeyPad;
