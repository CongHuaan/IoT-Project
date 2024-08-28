import { CCard, CCol, CContainer, CImage, CRow } from '@coreui/react'
import React from 'react'

const Profile = () => {
  return (
    <>
      <CContainer>
        <CCard style={{ height: "500px", overflow: "hidden" }}>
          <CImage fluid rounded src="./img\back2.jpg" />
        </CCard>
        <CCard style={{
          padding: "50px",
          marginTop: "-200px",
          marginLeft: "100px",
          marginRight: "100px"
        }}>
          <CRow>
            <CCol sm={4}>
              <CImage align="start" rounded src="./img\avatar.jpg" width={200} height={200} />
            </CCol>
            <CCol sm={8}>
              <h2>Nguyễn Công Huân</h2>
              <p>B21DCCN403</p>
            </CCol>
          </CRow>
          <CRow>
            <p>                     </p>
            <p><strong>Class: </strong>D21CNPM04</p>
            <p><strong>Email: </strong>anhhuaan@gmail.com</p>
            <p><strong>Phone: </strong>0985889474</p>
            <p><strong>Github: </strong>0985889474</p>
          </CRow>
        </CCard>
      </CContainer>

    </>
  )
}

export default Profile