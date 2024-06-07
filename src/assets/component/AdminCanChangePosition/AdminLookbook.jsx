import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import './Test.scss';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

const AdminLookBook = () => {
  const [mediaData, setMediaData] = useState([]);
  const [layout, setLayout] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch media data
      const mediaResponse = await fetch('http://localhost:8081/lookbooks');
      const mediaData = await mediaResponse.json();
      setMediaData(mediaData);

      // Fetch layout data
      const layoutResponse = await fetch('http://localhost:8081/layoutlb');
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
          h: 2
        }));
        setLayout(initialLayout);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const [videoStates, setVideoStates] = useState({});
  const videoRefs = useRef({});

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

  const onLayoutChange = (newLayout) => {
    setLayout(newLayout);
    console.log('Current layout:', newLayout);
  };

  const saveLayoutToDB = async () => {
    try {
      const response = await fetch('http://localhost:8081/layoutlb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ layout }),
      });
      if (!response.ok) {
        throw new Error('Error saving layout');
      }
      console.log('Layout saved to the database');
    } catch (error) {
      console.error('Error saving layout:', error);
    }
  };

  const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
  const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };

  return (
    <div className='container pt-5'>
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        onLayoutChange={onLayoutChange}
        breakpoints={breakpoints}
        cols={cols}
        rowHeight={100}
        width={1200}
        draggableHandle='.drag-handle'
      >
        {mediaData.map((media, index) => (
          <div key={media.id} className="item" id="video-scroll">
            <div className='drag-handle'>Drag here</div>
            <div
              onMouseOver={() => handlePlay(index)}
              onMouseLeave={() => handlePause(index)}
            >
              <ReactPlayer
                url={'http://localhost:8081' + media.url}
                ref={(player) => (videoRefs.current[index] = player)}
                playing={videoStates[index]}
                width="100%"
                className="videoin"
                loop={true}
                volume={0}
                muted={false}
              />
            </div>
          </div>
        ))}
      </ResponsiveGridLayout>
      <button onClick={saveLayoutToDB}>Save Layout</button>
    </div>
  );
};

export default AdminLookBook;
