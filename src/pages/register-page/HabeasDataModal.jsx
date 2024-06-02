import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const HabeasDataModal = ({ isHabeasModalOpen, setIsHabeasModalOpen }) => {
  const toggle = () => setIsHabeasModalOpen(!isHabeasModalOpen);

  return (
    <Modal
      className="login-page"
      isOpen={isHabeasModalOpen}
      toggle={toggle}
      backdrop="static"
    >
      <ModalHeader>Política y autorización de datos personales</ModalHeader>
      <ModalBody>
        <div className="habeas-text">
          <p>
            Al registrarse en la Aplicación Simulacion de cajero automatico,
            usted otorga autorización previa, expresa e informada a la Fundación
            Mundo Mujer con NIT. 800.065.180-9, domiciliada y ubicada en Popayán
            - Colombia en la Carrera 10 No. 4 – 60, teléfono (2) 835 38 38 y
            página web:{" "}
            <a href="www.fmm.org.co" target="_blank">
              www.fmm.org.co
            </a>{" "}
            quien, en desarrollo de su actividad y gestión, y con el fin de
            brindar colaboración empresarial entre las empresas del grupo,
            durante la ejecución de sus actividades podrá efectuar el
            tratamiento de datos personales de forma conjunta con las entidades
            que pertenezcan o llegaren a pertenecer al Grupo Empresarial Mundo
            Mujer, o a quien represente sus derechos u ostente en el futuro la
            calidad de acreedor, cesionario, o cualquier calidad frente a los
            titulares de la información.
          </p>
          <p>
            Los datos personales podrán ser incluidos, solicitados,
            recolectados, clasificados, catalogados, almacenados, administrados,
            usados, suprimidos, actualizados, rectificados, transmitidos y
            compartidos con los terceros y/o los autorizados por ley, incluyendo
            datos sensibles, de acuerdo con los términos y condiciones de la
            Política de Protección de Datos Personales, según sean aplicables y
            principalmente para hacer posible el acceso a los productos,
            servicios y beneficios que ofrece la Fundación Mundo Mujer, sus
            subordinadas, filiales, sociedades en la que sea accionista, y en
            general a las sociedades con las que tiene relaciones comerciales.
          </p>
          <p>
            La Fundación Mundo Mujer dará el tratamiento de los datos del
            titular conforme a las normas que regulan la materia contemplada en
            las leyes 1266 de 2008 y 1581 de 2012, su reglamentación, así como
            las que las modifique o sustituya y, en todo caso, atendiendo esta
            autorización.
          </p>
          <p>
            Para el caso de los menores de edad, la autorización previa, expresa
            e informada dada a la Fundación Mundo Mujer cuenta con la
            autorización del acudiente o representante legal del menor dado el
            contenido educativo de la aplicación.
          </p>
          <p>
            Usted podrá consultar la Política de Protección de Datos Personales
            de la Fundación Mundo Mujer danco click{" "}
            <a
              href="https://www.educacionmundomujer.com/Politica_de_Proteccion_de_Datos_Personales_FMM_web.pdf"
              target="_blank"
              rel="noreferrer"
            >
              aquí
            </a>{" "}
            y resolver dudas e inquietudes relacionadas con el tratamiento de
            los datos, presentar sus solicitudes y/o ejercer sus derechos
            escribiendo al correo protecciondedatos@fmm.org.co.
          </p>
        </div>
      </ModalBody>
      <ModalFooter className="justify-content-end">
        <button
          className="btn btn-orange"
          onClick={() => setIsHabeasModalOpen(false)}
        >
          OK
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default HabeasDataModal;
