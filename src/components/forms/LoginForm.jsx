import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import KeyPad from "components/common/KeyPad/KeyPad";
import { UserContext } from "context/UserContext";

const validate = (values) => {
  const errors = {};

  if (!values.schoolCode) {
    errors.schoolCode = "Código de la institución requerido";
  } else if (values.schoolCode.length > 3) {
    errors.schoolCode =
      "Código de la institución no puede ser mayor a 3 dígitos";
  }

  if (!values.age) {
    errors.age = "Edad requerida";
  } else if (isNaN(values.age)) {
    errors.age = "Edad debe ser un número";
  } else if (values.age.length > 2) {
    errors.age = "Edad no puede ser mayor a 2 dígitos";
  }

  if (!values.gender) {
    errors.gender = "Género requerido";
  }

  return errors;
};

const LoginForm = ({ formEl }) => {
  const { playPressButtonSound } = useContext(UserContext);
  const [focusedInput, setFocusedInput] = useState(null);

  const formik = useFormik({
    initialValues: {
      schoolCode: "",
      gender: "",
      age: "",
    },
    validate,
    validateOnMount: true,
    onSubmit: () => {
      setFocusedInput(null);
    },
  });

  useEffect(() => {
    formEl.current = formik;
  }, [formik, formEl]);

  const handleAddNumber = (num) => {
    playPressButtonSound();
    formik.setFieldValue(focusedInput, formik.values[focusedInput] + num);
  };

  const handleDeleteNumber = () => {
    playPressButtonSound();
    formik.setFieldValue(
      focusedInput,
      formik.values[focusedInput].substring(
        0,
        formik.values[focusedInput].length - 1
      )
    );
  };

  return (
    <div className="form-login">
      <form autoComplete="off">
        <div className="mb-4">
          <input
            name="schoolCode"
            type="text"
            placeholder="Código de la institución"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.schoolCode}
            onFocus={() => {
              setFocusedInput("schoolCode");
            }}
          />
          {formik.touched.schoolCode && formik.errors.schoolCode ? (
            <div className="text-danger">{formik.errors.schoolCode}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <input
            name="age"
            type="text"
            placeholder="¿Cuantos años tienes?"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.age}
            onFocus={() => {
              setFocusedInput("age");
            }}
          />
          {formik.touched.age && formik.errors.age ? (
            <div className="text-danger">{formik.errors.age}</div>
          ) : null}
        </div>
        <div className="d-flex justify-content-evenly">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="gender1"
              value="hombre"
              onChange={formik.handleChange}
            />
            <label className="form-check-label" for="gender1">
              Hombre
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="gender2"
              value="mujer"
              onChange={formik.handleChange}
            />
            <label className="form-check-label" for="gender2">
              Mujer
            </label>
          </div>
        </div>
        {formik.touched.gender && formik.errors.gender ? (
          <div className="text-danger">{formik.errors.gender}</div>
        ) : null}
      </form>

      {focusedInput && (
        <KeyPad
          handleAddNumber={handleAddNumber}
          handleDeleteNumber={handleDeleteNumber}
          onClose={() => {
            playPressButtonSound();
            setFocusedInput(null);
          }}
        />
      )}
    </div>
  );
};

export default LoginForm;
