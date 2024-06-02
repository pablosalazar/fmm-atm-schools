import React from "react";

import "./KeyPad.css";

const KeyPad = ({ handleAddNumber, handleDeleteNumber, onClose }) => {
  return (
    <div className='keypad btn-group-vertical ml-4 mt-4' role='group'>
      <div className='btn-group'>
        <button
          type='button'
          className='btn btn-keypad'
          onClick={() => handleAddNumber(1)}
        >
          1
        </button>
        <button
          type='button'
          className='btn btn-keypad'
          onClick={() => handleAddNumber(2)}
        >
          2
        </button>
        <button
          type='button'
          className='btn btn-keypad'
          onClick={() => handleAddNumber(3)}
        >
          3
        </button>
        <button type='button' className='btn btn-danger btn-lg'>
          Cancelar{" "}
        </button>
      </div>
      <div className='btn-group'>
        <button
          type='button'
          className='btn btn-keypad'
          onClick={() => handleAddNumber(4)}
        >
          4
        </button>
        <button
          type='button'
          className='btn btn-keypad'
          onClick={() => handleAddNumber(5)}
        >
          5
        </button>
        <button
          type='button'
          className='btn btn-keypad'
          onClick={() => handleAddNumber(6)}
        >
          6
        </button>
        <button
          type='button'
          className='btn btn-warning btn-lg'
          onClick={handleDeleteNumber}
        >
          Corregir
        </button>
      </div>
      <div className='btn-group'>
        <button
          type='button'
          className='btn btn-keypad'
          onClick={() => handleAddNumber(7)}
        >
          7
        </button>
        <button
          type='button'
          className='btn btn-keypad'
          onClick={() => handleAddNumber(8)}
        >
          8
        </button>
        <button
          type='button'
          className='btn btn-keypad'
          onClick={() => handleAddNumber(9)}
        >
          9
        </button>
        <button
          type='button'
          className='btn btn-success btn-lg'
          onClick={onClose}
        >
          Continuar
        </button>
      </div>
      <div className='btn-group'>
        <button type='button' className='btn btn-keypad'>
          #
        </button>

        <button
          type='button'
          className='btn btn-keypad'
          onClick={() => handleAddNumber(0)}
        >
          0
        </button>
        <button type='button' className='btn btn-keypad'>
          *
        </button>
        <button
          type='button'
          className='btn btn-light btn-lg disabled'
        ></button>
      </div>
    </div>
  );
};

export default KeyPad;
