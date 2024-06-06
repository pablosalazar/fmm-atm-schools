import React, { useEffect, useState } from "react";
import moment from "moment";

import { getStudents } from "service/student.service";
import "./InfoPage.css";
import { getActivities } from "service/activity.service";
import Loader from "components/common/Loader/Loader";

const InfoPage = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let items = await getStudents();
      const activities = await getActivities();

      items = items.map((item) => {
        const activity = activities.find(
          (activity) => activity.studentId === item.id
        );
        return {
          ...item,
          activityName: activity?.activity || "--",
          time: activity?.elapsedTime
            ? `${Math.trunc(activity?.elapsedTime / 1000)} seg`
            : "--",
        };
      });
      setStudents(items);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="info-container">
      {isLoading && <Loader />}
      <div className="container">
        <div className="info-page">
          <h1>Número de registros: {students.length}</h1>
          <hr />
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre Institución</th>
                  <th>Genero</th>
                  <th>Edad</th>
                  <th>Fecha registro</th>
                  <th>Hora registro</th>
                  <th>Actividad</th>
                  <th>Tiempo</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={student.id}>
                    <td>{index + 1}</td>
                    <td>{student.schoolName}</td>
                    <td>{student.gender}</td>
                    <td>{student.age} años</td>
                    <td>
                      {moment(student.createdAt.toDate()).format("DD-MM-YYYY")}
                    </td>
                    <td>
                      {moment(student.createdAt.toDate()).format("hh:mm A")}
                    </td>
                    <td>{student.activityName}</td>
                    <td>{student.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
