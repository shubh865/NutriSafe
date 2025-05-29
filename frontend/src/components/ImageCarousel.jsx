// components/ImageCarousel.js
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const ImageCarousel = ({ images }) => {
  return (
    <Carousel showArrows={true} showThumbs={false}>
      {images.map((image, index) => (
        <div key={index}>
          <img src={image} alt={`Image ${index + 1}`} style={{ width: '200px', height: '200px' }} />
        </div>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
