import React from 'react'
import { LogOut } from 'lucide-react'

function Logout() {
  return (
    <div className='logout box-shadow '>
        <div className='log-icon-color '>    <LogOut size={32} /></div>
        <h2>Confirm Logout</h2>
        <p className='mb-0'>Are you sure you want to end your current session?
             You will need to sign in again to access your account.</p>
        <div className="d-flex justify-content-evenly">

        <div className="btn btn-outline-primary">No</div>
        <div className="btn btn-outline-primary">Yes</div>
        </div>
    </div>
  )
}

export default Logout