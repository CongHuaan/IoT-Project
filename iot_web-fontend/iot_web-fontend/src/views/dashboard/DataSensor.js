import React, { useEffect, useState, useCallback } from "react";
import {
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTable,
  CTableRow,
  CTableDataCell,
  CCard,
} from "@coreui/react";

const DataSensor = () => {
  const [sensors, setSensors] = useState([]);
  const [sortField, setSortField] = useState("Id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isSorted, setIsSorted] = useState(false);

  const fetchSensors = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3001/sensor/all`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSensors(data);
    } catch (err) {
      console.log('Fetch Error:', err); // Log errors
    }
  }, []);

  const fetchSortedSensors = useCallback(async () => {
    try {
      if (["Humidity", "Temperature", "Light"].includes(sortField)) {
        const response = await fetch(`http://localhost:3001/sensor/sorted?sortBy=${sortField}&order=${sortOrder}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSensors(data);
      } else {
        fetchSensors();
      }
    } catch (err) {
      console.log('Fetch Error:', err); // Log errors
    }
  }, [sortField, sortOrder, fetchSensors]);

  useEffect(() => {
    if (isSorted) {
      fetchSortedSensors();
    } else {
      fetchSensors();
    }
  }, [fetchSensors, fetchSortedSensors, isSorted]);

  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle sortOrder when clicking the same field
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      // Set new field and default to ascending order
      setSortField(field);
      setSortOrder("asc");
    }
    setIsSorted(true);
  };

  const handleReset = () => {
    setIsSorted(false);
    fetchSensors(); // Fetch data without sorting
  };

  const getSortIcon = (field) => {
    if (sortField === field) {
      return sortOrder === "asc" ? "🔼" : "🔽";
    }
    return "🔼";
  };

  return (
    <>
      <CCard>
        <button onClick={handleReset}>Reset Sorting</button>
        <CTable>
          <CTableHead>
            <CTableRow color="dark">
              <CTableHeaderCell scope="col">
                Id
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">
                Name
              </CTableHeaderCell>
              <CTableHeaderCell
                scope="col"
                onClick={() => handleSort("Humidity")}
              >
                Humidity {getSortIcon("Humidity")}
              </CTableHeaderCell>
              <CTableHeaderCell
                scope="col"
                onClick={() => handleSort("Temperature")}
              >
                Temperature {getSortIcon("Temperature")}
              </CTableHeaderCell>
              <CTableHeaderCell
                scope="col"
                onClick={() => handleSort("Light")}
              >
                Light {getSortIcon("Light")}
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">
                Time update
              </CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {sensors.map((sensor, index) => (
              <CTableRow key={sensor.id}>
                <CTableHeaderCell scope="row">{index}</CTableHeaderCell>
                <CTableDataCell>{sensor.Name}</CTableDataCell>
                <CTableDataCell>{sensor.Humidity}</CTableDataCell>
                <CTableDataCell>
                  {sensor.Temperature
                    ? parseFloat(sensor.Temperature).toFixed(2)
                    : ""}
                </CTableDataCell>
                <CTableDataCell>
                  {sensor.Light ? parseInt(sensor.Light) : ""}
                </CTableDataCell>
                <CTableDataCell>{sensor.TimeUpdate}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCard>
    </>
  );
};

export default DataSensor;
