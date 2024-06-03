import { useFormik } from "formik";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { locale } from "helpers/Dates";
import { useEffect } from "react";

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Nombre requerido";
  }

  if (!values.code) {
    errors.code = "Código requerido";
  } else if (values.code.length !== 3) {
    errors.code = "El codigo debe tener 3 números";
  } else if (values.code) {
    const regex = /^[0-9]*$/;
    if (!regex.test(values.code)) {
      errors.code = "El código debe ser numérico";
    }
  }

  if (!values.eventDate) {
    errors.eventDate = "Fecha requerida";
  }

  return errors;
};

function SchoolForm({ formEl, selectedSchool = null }) {
  const formik = useFormik({
    initialValues: {
      name: "",
      code: "",
      eventDate: new Date(),
    },
    validate,
    validateOnMount: true,
    onSubmit: () => {},
  });

  useEffect(() => {
    formEl.current = formik;
  }, [formik, formEl]);

  useEffect(() => {
    if (selectedSchool) {
      formik.setValues({
        name: selectedSchool.name,
        code: selectedSchool.code,
        eventDate: selectedSchool.eventDate.toDate(),
      });
    }
  }, [selectedSchool]);

  return (
    <form autoComplete="off">
      <div className="mb-3">
        <label htmlFor="name">Nombre Institución</label>
        <input
          id="name"
          name="name"
          type="text"
          className="form-control"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="text-danger">{formik.errors.name}</div>
        ) : null}
      </div>
      <div className="mb-3">
        <label htmlFor="code">Código Institución</label>
        <input
          id="code"
          name="code"
          type="text"
          className="form-control"
          onChange={formik.handleChange}
          value={formik.values.code}
        />
        {formik.touched.code && formik.errors.code ? (
          <div className="text-danger">{formik.errors.code}</div>
        ) : null}
      </div>
      <div className="mb-3">
        <label>Fecha del evento</label>
        <DatePicker
          locale={locale}
          placeholderText="DD/MM/YYYY"
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          minDate={new Date()}
          selected={formik.values.eventDate}
          isClearable
        />
        {formik.touched.eventDate && formik.errors.eventDate ? (
          <div className="text-danger">{formik.errors.eventDate}</div>
        ) : null}
      </div>
    </form>
  );
}

export default SchoolForm;
