import React, { useContext, useRef, useState } from "react";
import { Formik } from "formik";
import KeyPad from "components/common/KeyPad/KeyPad";
import { UserContext } from "context/UserContext";

const validate = (values) => {
  const errors = {};

  if (!values.documentNumber) {
    errors.documentNumber = "Por favor ingresa tu número de documento";
  } else if (!values.documentNumber.match(/^[0-9]+$/)) {
    errors.documentNumber = "Por favor ingresa solo números";
  } else if (values.documentNumber.length < 4) {
    errors.documentNumber = "Por favor ingresa más de 5 digitos";
  }

  return errors;
};

const LoginForm = ({ formEl, signIn }) => {
  const { playPressButtonSound } = useContext(UserContext);
  const inputEl = useRef(null);
  const [isKeyPadOpen, setIsKeyPadOpen] = useState(false);
  const [fields, setFields] = useState({
    documentNumber: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFields({
      ...fields,
      [name]: value,
    });
  };

  const handleAddNumber = (num) => {
    playPressButtonSound();
    inputEl.current.value = inputEl.current.value + num;
    setFields({
      ...fields,
      documentNumber: inputEl.current.value,
    });
  };

  const handleDeleteNumber = () => {
    playPressButtonSound();
    if (inputEl.current.value) {
      inputEl.current.value = inputEl.current.value.slice(0, -1);
      setFields({
        ...fields,
        documentNumber: inputEl.current.value,
      });
    }
  };

  return (
    <div className='form-login'>
      <Formik
        enableReinitialize
        innerRef={formEl}
        initialValues={{
          ...fields,
        }}
        validateOnMount
        validate={validate}
        onSubmit={() => {}}
      >
        {({ errors, touched }) => (
          <form autoComplete='off'>
            <input
              ref={inputEl}
              type='text'
              name='documentNumber'
              value={fields.name}
              className='form-control'
              onChange={handleInputChange}
              placeholder='Número de documento'
              onFocus={() => {
                setIsKeyPadOpen(true);
              }}
            />
            {errors.documentNumber && touched.documentNumber && (
              <div className='text-danger'>{errors.documentNumber}</div>
            )}
          </form>
        )}
      </Formik>
      {isKeyPadOpen && (
        <KeyPad
          handleAddNumber={handleAddNumber}
          handleDeleteNumber={handleDeleteNumber}
          onClose={() => {
            playPressButtonSound();
            setIsKeyPadOpen(false);
            signIn();
          }}
        />
      )}
    </div>
  );
};

export default LoginForm;
