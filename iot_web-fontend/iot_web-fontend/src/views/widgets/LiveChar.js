import React, { useEffect, useRef, useState } from "react";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import { CChartLine } from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils";

const generateRandomData = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const LiveChar = () => {
  const data_humidity = useRef([]);
  const data_temperature = useRef([]);
  const data_light = useRef([]);
  const data_ran = useRef([]);
  const timeline = useRef([
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
  ]);
  const [time, setTime] = useState(0);
  const [liveData, setLiveData] = useState({
    light: 0,
    humidity: 0,
    temperature: 0,
    ran: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevState) => prevState + 1);
      
      // Generate random data
      const data = {
        humidity: generateRandomData(0, 100),
        temperature: generateRandomData(0, 40),
        light: generateRandomData(0, 1000),
        ran: generateRandomData(0, 100)
      };

      data_humidity.current.push(data.humidity);
      data_temperature.current.push(data.temperature);
      data_light.current.push(data.light);
      data_ran.current.push(data.ran);

      setLiveData(data);

    }, 3000);
    return () => clearInterval(interval);
  }, [time]);

  useEffect(() => {
    const date = new Date();
    if (time < 20) {
      timeline.current.splice(time, 1, date.toTimeString().split(" ")[0]);
    } else {
      timeline.current.push(date.toTimeString().split(" ")[0]);
      data_humidity.current.shift();
      data_temperature.current.shift();
      data_light.current.shift();
      data_ran.current.shift();
      timeline.current.shift();
    }
  }, [time]);

  return (
    <>
      <CCard className="mb-4" style={{ height: "90%" }}>
        <CRow>
          <CCol sm={7}>
            <CCardBody>
              <CRow>
                <CCol sm={6}>
                  <h4 className="card-title mb-0">Nhiệt độ và Độ ẩm</h4>
                  <p className="small text-medium-emphasis">
                    {`Nhiệt độ: ${liveData.temperature.toFixed(2)} °C | Độ ẩm: ${liveData.humidity} %`}
                  </p>
                </CCol>
                <CCol sm={7} className="d-none d-md-block"></CCol>
              </CRow>
              <CChartLine
                style={{ height: "300px", marginTop: "40px" }}
                data={{
                  labels: timeline.current,
                  datasets: [
                    {
                      label: "Nhiệt độ",
                      backgroundColor: "transparent",
                      borderColor: getStyle("--cui-success"),
                      pointHoverBackgroundColor: getStyle("--cui-success"),
                      borderWidth: 2,
                      data: data_temperature.current,
                    },
                    {
                      label: "Độ ẩm",
                      backgroundColor: hexToRgba(getStyle("--cui-info"), 10),
                      borderColor: getStyle("--cui-info"),
                      pointHoverBackgroundColor: getStyle("--cui-info"),
                      borderWidth: 2,
                      data: data_humidity.current,
                      fill: true,
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  animation: false,
                  plugins: {
                    legend: {
                      display: true,
                    },
                  },
                  scales: {
                    x: {
                      grid: {
                        drawOnChartArea: false,
                      },
                    },
                    y: {
                      ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 5,
                        stepSize: Math.ceil(100 / 5),
                        max: 100,
                      },
                    },
                  },
                  elements: {
                    line: {
                      tension: 0.8,
                    },
                    point: {
                      radius: 0,
                      hitRadius: 10,
                      hoverRadius: 4,
                      hoverBorderWidth: 3,
                    },
                  },
                }}
              />
            </CCardBody>
          </CCol>
          <CCol sm={5}>
            <CCardBody>
              <CRow>
                <CCol sm={5}>
                  <h4 className="card-title mb-0">Ánh sáng</h4>
                  <p className="small text-medium-emphasis">{liveData.light} LUX</p>
                </CCol>
                <CCol sm={7} className="d-none d-md-block"></CCol>
              </CRow>
              <CChartLine
                style={{ height: "300px", marginTop: "40px" }}
                data={{
                  labels: timeline.current,
                  datasets: [
                    {
                      label: "Ánh sáng",
                      backgroundColor: "transparent",
                      borderColor: getStyle("--cui-warning"),
                      pointHoverBackgroundColor: getStyle("--cui-warning"),
                      borderWidth: 1,
                      borderDash: [8, 5],
                      data: data_light.current,
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  animation: false,
                  plugins: {
                    legend: {
                      display: true,
                    },
                  },
                  scales: {
                    x: {
                      grid: {
                        drawOnChartArea: false,
                      },
                    },
                    y: {
                      ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 5,
                        stepSize: Math.ceil(1000 / 5),
                        max: 1000,
                      },
                    },
                  },
                  elements: {
                    line: {
                      tension: 0.8,
                    },
                    point: {
                      radius: 0,
                      hitRadius: 10,
                      hoverRadius: 4,
                      hoverBorderWidth: 3,
                    },
                  },
                }}
              />
            </CCardBody>
          </CCol>
        </CRow>
      </CCard>
    </>
  );
};

export default LiveChar;
