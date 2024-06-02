import React, { useEffect, useState } from "react";
import { getUsers } from "service/user.service";

import "./InfoPage.css";

const calculateAge = (date) => {
  const today = new Date();
  const birthDate = date.toDate();

  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const InfoPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const items = await getUsers();
      setUsers(items);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (users.length) {
      const formattedUsers = users.map((user) => ({
        Nombre: user.firstname,
        Apellidos: user.lastname,
        Documento: `${user.documentType} ${user.documentNumber}`,
        Departamento: user.department,
        Municipio: user.municipality,
        Telefono: user.phone,
        Edad: `${calculateAge(user.birthdate)} años`,
      }));

      console.log(JSON.stringify(formattedUsers));
    }
  }, [users]);

  return (
    <div className='container'>
      <div className='info-page'>
        <h1>Usuarios registrados {users.length}</h1>
        <div className='table-responsive'>
          <table className='table'>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre completo</th>
                <th>Documento</th>
                <th>Género</th>
                <th>Ciudad</th>
                <th>Municipio</th>
                <th>Edad</th>
                <th>Teléfono</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    {user.firstname} {user.lastname}
                  </td>
                  <td>
                    {user.documentType} {user.documentNumber}
                  </td>
                  <td>{user.gender}</td>
                  <td>{user.department}</td>
                  <td>{user.municipality}</td>
                  <td>{calculateAge(user.birthdate)} años</td>
                  <td>{user.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
