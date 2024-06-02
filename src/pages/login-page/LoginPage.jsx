import LoginForm from "components/forms/LoginForm";
import React, { createRef, useContext, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Loader from "components/common/Loader/Loader";
import { getUserByDocumentNumber } from "service/user.service";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "context/UserContext";

import "./LoginPage.css";

const LoginPage = () => {
  const { setUser } = useContext(UserContext);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = createRef(null);
  let navigate = useNavigate();

  const toggle = () => setIsLoginModalOpen(!isLoginModalOpen);

  const signIn = async () => {
    setErrorMessage("");
    const form = formRef.current;
    await form.submitForm();

    if (form.isValid) {
      try {
        const { documentNumber } = form.values;
        setIsLoading(true);
        const user = await getUserByDocumentNumber(documentNumber);
        if (user) {
          const userData = {
            id: user.id,
            fullname: `${user.firstname}  ${user.lastname}`,
            documentNumber: user.documentNumber,
            phone: user.phone,
          };
          localStorage.setItem("user", JSON.stringify(userData));

          setUser(userData);
          navigate("/cajero-automatico", { replace: true });
        } else {
          setErrorMessage("Usuario no encontrado");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Modal
        className="login-page"
        isOpen={isLoginModalOpen}
        toggle={toggle}
        backdrop="static"
      >
        <ModalHeader>Identifícate</ModalHeader>
        <ModalBody>
          <p>Para empezar ingresa tu número de documento</p>
          {errorMessage && <div className="text-danger">{errorMessage}</div>}
          <LoginForm formEl={formRef} signIn={signIn} />
          {isLoading && <Loader />}
        </ModalBody>
        <ModalFooter className="justify-content-end">
          <NavLink to="/registrar" className="btn btn-link">
            ¿Aún no estas registrado?
          </NavLink>
          <button className="btn btn-orange" onClick={signIn}>
            Ingresar
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default LoginPage;
