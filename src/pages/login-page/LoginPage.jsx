import LoginForm from "components/forms/LoginForm";
import React, { createRef, useContext, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Loader from "components/common/Loader/Loader";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "context/UserContext";

import "./LoginPage.css";
import { getSchoolByCode } from "service/school.service";
import { createStudent } from "service/student.service";

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
        const { schoolCode } = form.values;
        setIsLoading(true);
        const school = await getSchoolByCode(schoolCode);

        if (school) {
          const student = {
            schoolId: school.id,
            schoolName: school.name,
            schoolCode: school.code,
            gender: form.values.gender,
            age: form.values.age,
          };

          const userId = await createStudent(student);

          localStorage.setItem(
            "user",
            JSON.stringify({ ...student, id: userId })
          );
          setUser({ ...student, id: userId });
          navigate("/cajero-automatico", { replace: true });
        } else {
          setErrorMessage("Institución no encontrada");
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
          <p>Para empezar ingresa los siguientes datos</p>
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}
          <LoginForm formEl={formRef} />
          {isLoading && <Loader />}
        </ModalBody>
        <ModalFooter className="justify-content-end">
          <button className="btn btn-orange" onClick={signIn}>
            Ingresar
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default LoginPage;
