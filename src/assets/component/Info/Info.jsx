import React from "react";
import { useMediaQuery } from "@react-hook/media-query";

import "./Info.scss";
import HeaderBar from "../Header/header";
import Headermobie from "../Header/header_mobie";

function Info() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div>
      <div className="header">{isMobile ? <Headermobie /> : <HeaderBar />}</div>
      <div className="info-content">
        <h1>HAUSBYLINHPHAM</h1>
        <a href="https://goo.gl/maps/tPLvpo2673G3ABwBA">
          55 Ngo Gieng, O Cho Dua, Dong Da, Ha Noi
        </a>
        <p>Gmail: hausbylinhpham@gmail.com</p>
        <h3>
          All images may not be reproduced in any form, stored, or manipulated
          without prior written consent from HausByLinhPham and the copyright
          holder(s).
        </h3>
      </div>
    </div>
  );
}

export default Info;
