import React, { useEffect, useState } from "react";
import moment from "moment";
import Select from "react-select";

import { getStudents } from "service/student.service";
import "./InfoPage.css";
import { getActivities } from "service/activity.service";
import Loader from "components/common/Loader/Loader";
import { getSchools } from "service/school.service";
import DownloadIcon from "./downloadIcon";

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

  const convertToCSV = (data) => {
    if (!data.length) return "";

    const csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(","));

    for (const row of data) {
      const values = headers.map((header) => {
        const escape = ("" + row[header]).replace(/"/g, '\\"');
        return `"${escape}"`;
      });
      csvRows.push(values.join(","));
    }

    return csvRows.join("\n");
  };

  const donwloadFile = () => {
    const data = filteredStudents.map((student, index) => ({
      "#": index + 1,
      "Nombre Institución": student.schoolName,
      Genero: student.gender,
      Edad: `${student.age} años`,
      "Fecha registro": moment(student.createdAt.toDate()).format("DD-MM-YYYY"),
      "Hora registro": moment(student.createdAt.toDate()).format("hh:mm A"),
      Actividad: student.activityName,
      Tiempo: student.time,
    }));

    const csvData = convertToCSV(data);

    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "students_data.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="info-container mb-6">
      {isLoading && <Loader />}
      <div className="container">
        <div className="info-page">
          <h2>Eventos Cajero automático</h2>
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
          <div className="mt-3 text-end">
            <button type="button" onClick={donwloadFile}>
              <DownloadIcon />
            </button>
          </div>

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
