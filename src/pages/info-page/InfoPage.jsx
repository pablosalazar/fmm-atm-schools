import React, { useEffect, useState } from "react";
import moment from "moment";
import Select from "react-select";

import { getStudents } from "service/student.service";
import "./InfoPage.css";
import { getActivities } from "service/activity.service";
import Loader from "components/common/Loader/Loader";
import { getSchools } from "service/school.service";

const InfoPage = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [eventOptions, setEventOptions] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const schools = await getSchools();
      setEventOptions(
        schools.map((school) => ({ value: school.id, label: school.name }))
      );

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

  useEffect(() => {
    if (selectedEvent) {
      const filtered = students.filter(
        (student) => student.schoolId === selectedEvent.value
      );
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents(students);
    }
  }, [selectedEvent, students]);

  return (
    <div className="info-container">
      {isLoading && <Loader />}
      <div className="container">
        <div className="info-page">
          <h2>Info</h2>
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-6  mb-3">
                  <label>Evento</label>
                  <Select
                    onChange={(option) => {
                      setSelectedEvent(option);
                    }}
                    options={eventOptions}
                    placeholder="Selecciona una opción"
                    isClearable
                  />
                </div>
              </div>
            </div>
          </div>
          <hr />
          <p>
            Número de registros: <strong>{filteredStudents.length}</strong>
          </p>
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
                {filteredStudents.map((student, index) => (
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
