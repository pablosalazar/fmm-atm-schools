import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Formik } from "formik";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import colombia from "data/colombia.json";
import { locale } from "helpers/Dates";
import HabeasDataModal from "pages/register-page/HabeasDataModal";

const validate = (values) => {
  const errors = {};

  if (!values.firstname) {
    errors.firstname = "Por favor ingresa tu nombre";
  }

  if (!values.lastname) {
    errors.lastname = "Por favor ingresa tus apellidos";
  }

  if (!values.documentType) {
    errors.documentType = "Por favor selecciona el tipo de documento";
  }

  if (!values.documentNumber) {
    errors.documentNumber = "Por favor ingresa tu número de documento";
  } else if (!values.documentNumber.match(/^[0-9]+$/)) {
    errors.documentNumber = "Por favor ingresa solo números";
  }

  if (!values.department) {
    errors.department = "Por favor ingresa tu departamento";
  }

  if (!values.municipality) {
    errors.municipality = "Por favor ingresa tu municipio";
  }

  if (!values.phone) {
    errors.phone = "Por favor ingresa tu teléfono";
  }

  if (!values.birthdate) {
    errors.birthdate = "Por favor ingresa tu fecha de nacimiento";
  }

  if (!values.gender) {
    errors.gender = "Por favor ingresa tu genero";
  }

  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Ingrese un correo electrónico valido";
  }

  if (!values.isChecked) {
    errors.isChecked = "Por favor acepte los términos y condiciones";
  }

  return errors;
};

const documentTypes = [
  { value: "C.C", label: "C.C" },
  { value: "T.I", label: "T.I" },
  { value: "C.E", label: "C.E" },
];

const genderTypes = [
  { value: "Masculino", label: "Masculino" },
  { value: "Femenino", label: "Femenino" },
];

const RegisterForm = ({ formEl }) => {
  const [isHabeasModalOpen, setIsHabeasModalOpen] = useState(false);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [townOptions, setTownOptions] = useState([]);
  const [fields, setFields] = useState({
    firstname: "",
    lastname: "",
    documentType: "",
    documentNumber: "",
    department: "",
    municipality: "",
    phone: "",
    birthdate: null,
    gender: null,
    email: "",
    isChecked: false,
  });

  useEffect(() => {
    const deptOptions = colombia.map((item) => ({
      value: item.departamento,
      label: item.departamento,
    }));

    setDepartmentOptions(deptOptions);
  }, []);

  useEffect(() => {
    if (fields.department) {
      setFields({
        ...fields,
        municipality: null,
      });
      const department = colombia.find(
        (item) => item.departamento === fields.department.value
      );

      const { ciudades } = department;

      const townOptions = ciudades.map((item) => ({
        value: item,
        label: item,
      }));

      setTownOptions(townOptions);
    } else {
      setTownOptions([]);
      setFields({
        ...fields,
        municipality: null,
      });
    }
  }, [fields.department]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFields({
      ...fields,
      [name]: value,
    });
  };

  return (
    <div className='form-register'>
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
            <p className='text-end'>
              Los campos marcados con (<span className='f_req'>*</span>) son
              obligatorios
            </p>
            {/* Nombre y documento */}
            <div className='row'>
              <div className='col-md-6  mb-3'>
                <label>
                  Nombres <span className='f_req'>*</span>
                </label>
                <input
                  type='text'
                  name='firstname'
                  value={fields.firstname}
                  className='form-control'
                  onChange={handleInputChange}
                />
                {errors.firstname && touched.firstname && (
                  <div className='text-danger'>{errors.firstname}</div>
                )}
              </div>

              <div className='col-md-6  mb-3'>
                <label>
                  Apellidos <span className='f_req'>*</span>
                </label>
                <input
                  type='text'
                  name='lastname'
                  className='form-control'
                  value={fields.lastname}
                  onChange={handleInputChange}
                />
                {errors.lastname && touched.lastname && (
                  <div className='text-danger'>{errors.lastname}</div>
                )}
              </div>
            </div>

            <div className='row'>
              <div className='col-md-6  mb-3'>
                <label>
                  Tipo de documento <span className='f_req'>*</span>
                </label>
                <Select
                  value={fields.documentType}
                  onChange={(option) => {
                    setFields({
                      ...fields,
                      documentType: option,
                    });
                  }}
                  options={documentTypes}
                  placeholder='Selecciona una opción'
                  isClearable
                />
                {errors.documentType && touched.documentType && (
                  <div className='text-danger'>{errors.documentType}</div>
                )}
              </div>

              <div className='col-md-6  mb-3'>
                <label>
                  Número de documento<span className='f_req'>*</span>
                </label>
                <input
                  type='text'
                  name='documentNumber'
                  className='form-control'
                  value={fields.documentNumber}
                  onChange={handleInputChange}
                />
                {errors.documentNumber && touched.documentNumber && (
                  <div className='text-danger'>{errors.documentNumber}</div>
                )}
              </div>
            </div>

            {/* Depatamento y municipio */}
            <div className='row'>
              <div className='col-md-6 mb-3'>
                <label>
                  Departamento <span className='f_req'>*</span>
                </label>
                <Select
                  value={fields.department}
                  onChange={(option) => {
                    setFields({
                      ...fields,
                      department: option,
                    });
                  }}
                  options={departmentOptions}
                  placeholder='Selecciona una opción'
                  isClearable
                />
                {errors.department && touched.department && (
                  <div className='text-danger'>{errors.department}</div>
                )}
              </div>
              <div className='col-md-6 mb-3'>
                <label>
                  Municipio <span className='f_req'>*</span>
                </label>
                <Select
                  value={fields.municipality}
                  onChange={(option) => {
                    setFields({
                      ...fields,
                      municipality: option,
                    });
                  }}
                  options={townOptions}
                  placeholder='Selecciona una opción'
                  isClearable
                />
                {errors.municipality && touched.municipality && (
                  <div className='text-danger'>{errors.municipality}</div>
                )}
              </div>
            </div>

            <div className='row'>
              <div className='col-md-6 mb-3'>
                <label>
                  Teléfono <span className='f_req'>*</span>
                </label>
                <input
                  type='text'
                  name='phone'
                  className='form-control'
                  onChange={handleInputChange}
                />
                {errors.phone && touched.phone && (
                  <div className='text-danger'>{errors.phone}</div>
                )}
              </div>
              <div className='col-md-6 mb-3'>
                <label>
                  Fecha de nacimiento <span className='f_req'>*</span>
                </label>
                <DatePicker
                  locale={locale}
                  selected={fields.birthdate}
                  onChange={(date) => setFields({ ...fields, birthdate: date })}
                  placeholderText='DD/MM/YYYY'
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode='select'
                  maxDate={new Date()}
                  withPortal
                  isClearable
                  disableAutoFocus
                  closeOnScroll={false}
                />
                {errors.birthdate && touched.birthdate && (
                  <div className='text-danger'>{errors.birthdate}</div>
                )}
              </div>
            </div>

            <div className='row'>
              <div className='col-md-6 mb-3'>
                <label>
                  Genero <span className='f_req'>*</span>
                </label>
                <Select
                  value={fields.gender}
                  onChange={(option) => {
                    setFields({
                      ...fields,
                      gender: option,
                    });
                  }}
                  options={genderTypes}
                  placeholder='Selecciona una opción'
                  isClearable
                />
                {errors.gender && touched.gender && (
                  <div className='text-danger'>{errors.gender}</div>
                )}
              </div>

              <div className='col-md-6 mb-3'>
                <label>Correo</label>
                <input
                  type='text'
                  name='email'
                  className='form-control'
                  onChange={handleInputChange}
                />
                {errors.email && touched.email && (
                  <div className='text-danger'>{errors.email}</div>
                )}
              </div>
            </div>

            <div className='row'>
              <div className='col-md-12'>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    name='isChecked'
                    value={fields.isChecked}
                    id='data_processing_policy'
                    onChange={() => {
                      setFields({
                        ...fields,
                        isChecked: !fields.isChecked,
                      });
                    }}
                  />
                  <label
                    className='form-check-label'
                    htmlFor='data_processing_policy'
                  >
                    Acepto política y autorización de datos personales{" "}
                    <span className='f_req'>*</span>
                  </label>
                  {errors.isChecked && touched.isChecked && (
                    <div className='text-danger'>{errors.isChecked}</div>
                  )}
                  <button
                    type='button'
                    className='btn btn-link'
                    onClick={() => setIsHabeasModalOpen(true)}
                  >
                    Ver mas aquí
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
      <HabeasDataModal
        isHabeasModalOpen={isHabeasModalOpen}
        setIsHabeasModalOpen={setIsHabeasModalOpen}
      />
    </div>
  );
};

export default RegisterForm;
