import React from 'react';
import { useMediaQuery } from "@react-hook/media-query";
import VideoCarousel from './SlideShow/slideShow';
import HeaderBar from '../Header/header';
import Headermobie from '../Header/header_mobie';
import './MainPage.scss';

function MainPage() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div>
      <div className='header'>
        {isMobile ? <Headermobie /> : <HeaderBar />}
      </div>
      <div className='slideshow'>
        <VideoCarousel />
      </div>
    </div>
  );
}

export default MainPage;
