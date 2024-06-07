import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './PAdmin.scss'; 

function PAdmin() {
  return (
    <div>
      <ul className="admin-menu">
        <li><Link to='/' >Hausbylinhpham</Link></li>
        <li><Link to="/admin">Upload Video</Link></li>
        <li><Link to="/admin/campaign">Campagin</Link></li>
        <li><Link to="/admin/lookbook">Lookbook</Link></li>
      </ul>
      <div>
         <Outlet />
      </div>
    </div>
  );
}

export default PAdmin;
