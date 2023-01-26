import React, { useState, useEffect } from "react";

function ServiceHistory() {
  const [appointments, setAppointments] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const url = "http://localhost:8080/api/appointments/";
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();

        setAppointments(data.appointments);
      }
    };
    fetchAppointments();
  }, []);

  const searchAppointments = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = appointments.filter((appointment) => {
        return Object.values(appointment)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(appointments);
    }
  };

  return (
    <div className="container mt-3">
      <div className="input-group">
        <input
          type="search"
          className="form-control rounded"
          aria-describedby="search-addon"
          placeholder="Search by VIN here"
          aria-label="Search"
          onChange={(e) => searchAppointments(e.target.value)}
          value={searchInput}
        />
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={(e) => searchAppointments(e.target.value)}
          value={searchInput}
        >
          Search
        </button>
      </div>

      <h1>Service Appointments</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Customer Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Technician</th>
            <th>Reason</th>
            <th>VIP</th>
          </tr>
        </thead>
        <tbody>
          {searchInput.length > 0
            ? filteredResults.map((appointment) => {
                return (
                  <tr key={appointment.id}>
                    <td>{appointment.vin}</td>
                    <td>{appointment.customer_name}</td>
                    <td>
                      {new Date(
                        appointment.appointment_time
                      ).toLocaleDateString()}
                    </td>
                    <td>
                      {new Date(
                        appointment.appointment_time
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td>{appointment.technician.name}</td>
                    <td>{appointment.reason}</td>
                    <td>{appointment.vip.toString()}</td>
                  </tr>
                );
              })
            : appointments.map((appointment) => {
                return (
                  <tr key={appointment.id}>
                    <td>{appointment.vin}</td>
                    <td>{appointment.customer_name}</td>
                    <td>
                      {new Date(
                        appointment.appointment_time
                      ).toLocaleDateString()}
                    </td>
                    <td>
                      {new Date(
                        appointment.appointment_time
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td>{appointment.technician.name}</td>
                    <td>{appointment.reason}</td>
                    <td>{appointment.vip.toString()}</td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
}

export default ServiceHistory;
