import React from 'react';
import CardWrapContainer from './CardWrap/CardWrapContainer';
import SwiperSlideComponent from './SwiperSlideComponent/SwiperSlideComponent';

  const Homepage:React.FC = () => {
    return (
      <div>
        <SwiperSlideComponent />
        <CardWrapContainer />
      </div>
    );
  }

  export default Homepage;
