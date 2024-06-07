import React, { useRef } from "react";
import "./header.scss";
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

function HeaderBar() {
  const [isHovering, setIsHovering] = useState(false);
  const [isHovering1, setIsHovering1] = useState(true);
  const [isHovering2, setIsHovering2] = useState(true);
  const [isHovering3, setIsHovering3] = useState(true);
  const done = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const navigate = useNavigate();

  return (
    <div className="container-height">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="heightView"
      >
        {isHovering ? (
          <div className="hidden">
            <ul>
              <li className="hidden-item Artitsts">
                <button
                  type="button"
                  value="News"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  <p className="new-hover">represents</p>
                </button>
              </li>

              <li className="hidden-item Artitsts">
                <button
                  type="button"
                  value="News"
                  onClick={() => {
                    navigate("/lookbook");
                  }}
                >
                  <p>lookbook</p>
                </button>
              </li>

              <li className="hidden-item Artitsts">
                <button
                  type="button"
                  value="News"
                  onClick={() => {
                    navigate("/campaign");
                  }}
                >
                  <p>campaign</p>
                </button>
              </li>

              <li className="hidden-item Contact">
                <Link to="/info">
                  <p>(info)</p>
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <div className="header-main">
            <div className="main-content">
              <a href="/">
                <p>HausbyLinhPham</p>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default HeaderBar;
