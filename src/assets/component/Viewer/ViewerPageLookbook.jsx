import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { Responsive, WidthProvider } from "react-grid-layout";
import { useMediaQuery } from "@react-hook/media-query";

import "./ReadOnly.scss";
import HeaderBar from "../Header/header";
import Headermobie from "../Header/header_mobie";
const ResponsiveGridLayout = WidthProvider(Responsive);

const ViewerPageLookbook = () => {
  const [mediaData, setMediaData] = useState([]);
  const [layout, setLayout] = useState([]);
  const [videoStates, setVideoStates] = useState({});
  const videoRefs = useRef({});
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch media data
      const mediaResponse = await fetch("http://localhost:8081/lookbooks");
      const mediaData = await mediaResponse.json();
      setMediaData(mediaData);

      // Fetch layout data
      const layoutResponse = await fetch("http://localhost:8081/layoutlb");
      const layoutData = await layoutResponse.json();
      if (layoutData.length > 0) {
        setLayout(JSON.parse(layoutData[0].layout_data));
      } else {
        // Create initial layout if no layout data is found
        const initialLayout = mediaData.map((media, index) => ({
          i: media.id.toString(),
          x: (index * 2) % 12,
          y: Infinity, // Puts in the next available row
          w: 2,
          h: 2,
        }));
        setLayout(initialLayout);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePlay = (index) => {
    setVideoStates((prevStates) => ({
      ...prevStates,
      [index]: true,
    }));
    videoRefs.current[index]?.getInternalPlayer().play();
  };

  const handlePause = (index) => {
    setVideoStates((prevStates) => ({
      ...prevStates,
      [index]: false,
    }));
    videoRefs.current[index]?.getInternalPlayer().pause();
  };

  const handleFullScreen = (index) => {
    const player = videoRefs.current[index]?.getInternalPlayer();
    if (player && player.requestFullscreen) {
      player.requestFullscreen();
    } else if (player && player.webkitRequestFullscreen) {
      // Safari
      player.webkitRequestFullscreen();
    } else if (player && player.mozRequestFullScreen) {
      // Firefox
      player.mozRequestFullScreen();
    } else if (player && player.msRequestFullscreen) {
      // IE/Edge
      player.msRequestFullscreen();
    }
  };

  const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
  const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };

  return (
    <div>
      <div className="header">{isMobile ? <Headermobie /> : <HeaderBar />}</div>

      <div className="container pt-5">
        <ResponsiveGridLayout
          className="layout1"
          layouts={{ lg: layout }}
          breakpoints={breakpoints}
          cols={cols}
          rowHeight={100}
          width={1200}
          isDraggable={false} // Disable dragging
          isResizable={false} // Disable resizing
        >
          {mediaData.map((media, index) => (
            <div key={media.id} className="item1">
              <div
                onMouseOver={() => handlePlay(index)}
                onMouseLeave={() => handlePause(index)}
                onClick={() => handleFullScreen(index)}
              >
                <ReactPlayer
                  url={"http://localhost:8081" + media.url}
                  ref={(player) => (videoRefs.current[index] = player)}
                  playing={videoStates[index]}
                  width="100%"
                  loop={true}
                  volume={0}
                  muted={true} // Muted by default
                />
              </div>
            </div>
          ))}
        </ResponsiveGridLayout>
      </div>
    </div>
  );
};

export default ViewerPageLookbook;
