import React from "react";
import { Link, Outlet } from 'react-router-dom';
import './header_mobie.scss'; // Import file SCSS để áp dụng style

function Headermobie() {
  return (
    <div className="header-container">
      <ul className="header-menu">
        <h1 className="logo">Hausbylinhpham</h1>
        <li>
          <Link to="/campaign">Campaign</Link>
        </li>
        <li>
          <Link to="/lookbook">Lookbook</Link>
        </li>
        <li>
          <Link to="/info">Info</Link>
        </li>
      </ul>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Headermobie;
