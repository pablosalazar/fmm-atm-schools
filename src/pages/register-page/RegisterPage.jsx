import Loader from "components/common/Loader/Loader";
import RegisterForm from "components/forms/RegisterForm";
import React, { createRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { createUser, getUserByDocumentNumber } from "service/user.service";

import "./RegisterPage.css";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [wasRegisteredSuccessfully, setWasRegisteredSuccessfully] =
    useState(false);

  const formRef = createRef(null);

  const handleSubmitForm = async () => {
    const form = formRef.current;
    await form.submitForm();
    if (form.isValid) {
      const formData = form.values;
      const data = {
        ...formData,
        documentType: formData.documentType.value,
        department: formData.department.value,
        municipality: formData.municipality.value,
        gender: formData.gender.value,
      };

      const user = await getUserByDocumentNumber(data.documentNumber);

      if (user) {
        setErrorMessage("Este usuario ya se encuentra registrado");
      } else {
        setIsLoading(true);
        try {
          await createUser(data);
          setWasRegisteredSuccessfully(true);
        } catch (error) {
          setErrorMessage(
            "¡Ups! Se ha producido un error, por favor intentalo de nuevo"
          );
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  const resetForm = () => {
    window.location.reload();
  };

  return (
    <div className='register-page'>
      <div className='container'>
        <div className='form-register'>
          {/* <header>
            <h1>REGISTRO</h1>
          </header> */}
          <div className='form-register-content'>
            {!wasRegisteredSuccessfully ? (
              <>
                {isLoading && <Loader />}
                {errorMessage && (
                  <div className='alert alert-danger'>{errorMessage}</div>
                )}
                <RegisterForm formEl={formRef} />
                <div className='row'>
                  <div className='col-md-12 text-center'>
                    <button
                      className='btn btn-orange'
                      type='button'
                      onClick={handleSubmitForm}
                    >
                      Registrarme
                    </button>
                  </div>

                  <div className='d-flex justify-content-between mt-4'>
                    <NavLink to='/iniciar-sesion' className='btn btn-link'>
                      Volver al inicio
                    </NavLink>
                    <button
                      type='button'
                      className='btn btn-link'
                      onClick={resetForm}
                    >
                      Limpiar formulario
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className='alert alert-success'>
                  Registro exitoso, da click en el boton para seguir
                  registrando, o da click{" "}
                  <NavLink to='/iniciar-sesion'>aquí</NavLink> para regresar al
                  inicio
                </div>
                <div className='text-center'>
                  <button className='btn btn-orange' onClick={resetForm}>
                    Reiniciar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
