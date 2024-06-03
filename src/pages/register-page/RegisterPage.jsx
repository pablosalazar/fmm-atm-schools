import React, { useEffect, useState } from "react";

import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Loader from "components/common/Loader/Loader";
import SchoolForm from "components/forms/SchoolForm";

import "./RegisterPage.css";
import { useRef } from "react";
import {
  createSchool,
  deleteSchool,
  getSchools,
  updateSchool,
} from "service/school.service";
import moment from "moment";
import Swal from "sweetalert2";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [show, setShow] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    get();
  }, []);

  useEffect(() => {
    if (selectedSchool) {
      setShow(true);
    }
  }, [selectedSchool]);

  const handleClose = () => {
    setShow(false);
    setSelectedSchool(null);
  };

  const get = async () => {
    setIsLoading(true);
    const response = await getSchools();
    setSchools(response);
    setIsLoading(false);
  };

  const save = async () => {
    const form = formRef.current;
    await form?.submitForm();
    if (form?.isValid) {
      setIsLoading(true);
      if (selectedSchool) {
        await updateSchool(selectedSchool.id, form.values);
      } else {
        await createSchool(form.values);
      }

      setShow(false);
      get();
    }
  };

  const remove = async (id) => {
    Swal.fire({
      title: "Borrar Institución?",
      text: "Confirmas que quieres borrar esta institución",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        await deleteSchool(id);
        get();
      }
    });
  };

  return (
    <div className="register-page">
      {isLoading && <Loader />}
      <div className="container">
        <div className="card">
          <div className="card-body">
            <h2>Instituciones</h2>
            <div className="text-end mb-3">
              <button
                type="text"
                className="btn btn-primary"
                onClick={() => setShow(true)}
              >
                Nuevo
              </button>
            </div>
            <p>Total instituciones: {schools.length}</p>
            <table className="table table-bordered table-striped table-sm shadow-sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Institución</th>
                  <th>Codígo</th>
                  <th>Fecha de registro</th>
                </tr>
              </thead>
              <tbody>
                {schools.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No hay datos
                    </td>
                  </tr>
                )}
                {schools.map((school, index) => (
                  <tr key={school.id}>
                    <td>{index + 1}</td>
                    <td>{school.name}</td>
                    <td>{school.code}</td>
                    <td>
                      {moment(school.createdAt?.toDate()).format("DD/MM/YYYY")}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary me-3"
                        onClick={() => setSelectedSchool(school)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => remove(school.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal isOpen={show} toggle={() => setShow(!show)} backdrop="static">
        <ModalHeader>
          {selectedSchool ? "Actualizar" : "Ingresar"} Institución
        </ModalHeader>
        <ModalBody>
          <SchoolForm formEl={formRef} selectedSchool={selectedSchool} />
        </ModalBody>
        <ModalFooter className="justify-content-end">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={handleClose}
          >
            Cerrar
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={save}
          >
            {selectedSchool ? "Actualizar" : "Ingresar"}
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default RegisterPage;
