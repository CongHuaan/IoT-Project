import React, { useEffect, useState, memo } from "react";
import { CRow, CCol } from "@coreui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTint, faThermometerHalf, faSun } from '@fortawesome/free-solid-svg-icons';

const WidgetsDropdown = () => {
  const [hum, setHum] = useState(0);
  const [temp, setTemp] = useState(0);
  const [light, setLight] = useState(0);
  const [counter, setCounter] = useState(0);

  const getGradient = (value, min, max, baseColor) => {
    const ratio = (value - min) / (max - min);
    const [r, g, b] = baseColor.match(/\d+/g).map(Number);
    const darkColor = `rgba(${r}, ${g}, ${b}, 1)`;
    const lightColor = `rgba(${r}, ${g}, ${b}, 0.3)`; // Adjusted opacity for a softer gradient
    return `linear-gradient(to top, ${darkColor} ${ratio * 100}%, ${lightColor} ${ratio * 100}%)`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prevCounter => {
        const newCounter = prevCounter + 1;
        if (newCounter > 20) {
          clearInterval(interval);
          return 20;
        }
        return newCounter;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const newHum = Math.floor(counter * 100 / 20);
    const newTemp = Math.floor(counter * 40 / 20);
    const newLight = Math.floor(counter * 1000 / 20);

    setHum(newHum);
    setTemp(newTemp);
    setLight(newLight);
  }, [counter]);

  const widgetStyle = (value, min, max, baseColor) => ({
    background: getGradient(value, min, max, baseColor),
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'background 0.5s ease',
    padding: '20px',
    borderRadius: '10px',
    color: 'white',
    textAlign: 'center',
    fontSize: '1.5rem', // Increased font size
    fontWeight: 'bold',
    height: '140px', // Increased height
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  });

  const iconStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    fontSize: '2rem', // Increased icon size
    color: 'white',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)' // Added shadow for better visibility
  };

  const textStyle = {
    margin: 0,
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)' // Added shadow for text
  };

  return (
    <CRow className="g-4">
      <CCol sm={6} lg={4}>
        <div style={widgetStyle(hum, 0, 100, 'rgb(0, 123, 255)')}>
          <FontAwesomeIcon icon={faTint} style={iconStyle} />
          <p style={{ ...textStyle, fontSize: '1.5rem' }}>Độ ẩm</p>
          <p style={{ ...textStyle, fontSize: '1.5rem' }}>{hum}%</p> {/* Increased value size */}
        </div>
      </CCol>
      <CCol sm={6} lg={4}>
        <div style={widgetStyle(temp, 0, 40, 'rgb(255, 100, 34)')}>
          <FontAwesomeIcon icon={faThermometerHalf} style={iconStyle} />
          <p style={{ ...textStyle, fontSize: '1.5rem' }}>Nhiệt độ</p>
          <p style={{ ...textStyle, fontSize: '1.5rem' }}>{temp}°C</p> {/* Increased value size */}
        </div>
      </CCol>
      <CCol sm={6} lg={4}>
        <div style={widgetStyle(light, 0, 1000, 'rgb(255, 190, 0)')}>
          <FontAwesomeIcon icon={faSun} style={iconStyle} />
          <p style={{ ...textStyle, fontSize: '1.5rem' }}>Ánh sáng</p>
          <p style={{ ...textStyle, fontSize: '1.5rem' }}>{light} LUX</p> {/* Increased value size */}
        </div>
      </CCol>
    </CRow>
  );
};

export default memo(WidgetsDropdown);



