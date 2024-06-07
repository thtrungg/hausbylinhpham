import React, { useState, useRef, useEffect } from "react";
import "./slideShow.scss";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlay, FaPause } from "react-icons/fa";

const VideoCarousel = () => {
  const videoRefs = useRef([]);
  const [playingIndex, setPlayingIndex] = useState(-1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mediaData, setMediaData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mediaResponse = await fetch("http://localhost:8081/mvideos");
        const mediaData = await mediaResponse.json();
        setMediaData(mediaData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSelect = (selectedIndex, e) => {
    // Pause the currently playing video
    if (playingIndex !== -1 && videoRefs.current[playingIndex]) {
      videoRefs.current[playingIndex].pause();
    }
    // Set active index to the newly selected index
    setActiveIndex(selectedIndex);
  };

  const handlePlayPause = (index) => {
    // Toggle play/pause for the selected video index
    if (index === playingIndex) {
      if (!videoRefs.current[index].paused) {
        videoRefs.current[index].pause();
        setPlayingIndex(-1);
      }
    } else {
      if (playingIndex !== -1 && videoRefs.current[playingIndex]) {
        videoRefs.current[playingIndex].pause();
      }
      videoRefs.current[index].play();
      setPlayingIndex(index);
    }
  };

  return (
    <div className="container mt-5">
      <Carousel
        indicators={false}
        interval={null}
        className="video-carousel"
        slide={false}
        fade={false}
        onSelect={handleSelect}
      >
        {mediaData.map((media, index) => (
          <Carousel.Item key={media.id}>
            <div className="video-player">
              <video
                ref={(ref) => (videoRefs.current[index] = ref)}
                src={"http://localhost:8081" + media.url}
                className="video-element"
                onEnded={() => {
                  // Autoplay next video when current video ends
                  const nextIndex = (index + 1) % mediaData.length;
                  handlePlayPause(nextIndex);
                }}
              />
              <button
                className="play-pause-btn"
                onClick={() => handlePlayPause(index)}
              >
                {playingIndex === index ? (
                  <FaPause style={{ fontSize: "50px" }} className="pause" />
                ) : (
                  <FaPlay style={{ fontSize: "50px" }} className="play" />
                )}
              </button>
            </div>
            <div className="video-title">
              <p>
                Featured {index + 1}/{mediaData.length}  {media.title}
              </p>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default VideoCarousel;
