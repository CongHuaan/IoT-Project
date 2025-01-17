import React, { useState, useEffect } from "react";
import { CCard, CRow, CCol } from "@coreui/react";
import { Switch } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FaFan } from "react-icons/fa";
import { MdAcUnit } from "react-icons/md";
import { FaLightbulb } from "react-icons/fa";
import "../css/button.css";

const CusSwitch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&::before, &::after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&::before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&::after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

const ButtonControll = () => {
  const [l1, setL1] = useState(false);
  const [l2, setL2] = useState(false);
  const [l3, setL3] = useState(false);

  useEffect(() => {
    // You can add logic here if needed
  }, []);

  const handleSwitchChange = (id) => {
    const newStatus = id === 1 ? !l1 : id === 2 ? !l2 : !l3;

    if (id === 1) setL1(newStatus);
    else if (id === 2) setL2(newStatus);
    else if (id === 3) setL3(newStatus);

    // Simulate API request
    // fetch(`http://localhost:3001/led/${id}`, {
    //   method: newStatus ? "POST" : "PUT",
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       alert("Tắt thất bại !");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <CCard className="" style={{ height: "90%" }}>
      <CRow className="align-items-center text-center">
        <CCol xs={12} className="mb-2">
          <p style={{ padding: "22px", fontWeight: "600", fontSize: "1rem" }}>
            Điều khiển đèn
          </p>
          <div className="d-flex align-items-center justify-content-center my-1">
            <FaLightbulb
              className={l1 ? "text-warning" : "text-secondary"}
              style={{ height: "40px", width: "40px" }}
            />
            <CusSwitch
              checked={l1}
              onChange={() => handleSwitchChange(1)}
            />
          </div>
        </CCol>

        <CCol xs={12} className="mb-2">
          <p style={{ padding: "22px", fontWeight: "600", fontSize: "1rem" }}>
            Điều khiển quạt
          </p>
          <div className="d-flex align-items-center justify-content-center my-1">
            <FaFan
              className={l2 ? "text-danger rotate" : "text-secondary"}
              style={{ height: "40px", width: "40px" }}
            />
            <CusSwitch
              checked={l2}
              onChange={() => handleSwitchChange(2)}
            />
          </div>
        </CCol>

        <CCol xs={12} className="mb-4">
          <p style={{ padding: "22px", fontWeight: "600", fontSize: "1rem" }}>
            Điều khiển điều hòa
          </p>
          <div className="d-flex align-items-center justify-content-center my-1">
            <MdAcUnit
              className={l3 ? "text-info rotate" : "text-secondary"}
              style={{ height: "40px", width: "40px" }}
            />
            <CusSwitch
              checked={l3}
              onChange={() => handleSwitchChange(3)}
            />
          </div>
        </CCol>
      </CRow>
    </CCard>
  );
};

export default ButtonControll;
