import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="#" target="_blank" rel="noopener noreferrer">
          dashbroad
        </a>
        <span className="ms-1">&copy; 2024 IotLabs.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">facebook</span>
        <a href="https://web.facebook.com/cong.huaan.cter/?locale=vi_VN" target="_blank" rel="noopener noreferrer">
          Công Huân
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
