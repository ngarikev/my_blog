import React from 'react'
import { PacmanLoader } from 'react-spinners';

function Loader() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100"><PacmanLoader color="#FFD700" /></div>
  )
}

export default Loader