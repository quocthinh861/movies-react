import React, { useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { img_300, noPicture } from '../../../config/config';
import './Carousel.css'
const handleDragStart = (e) => e.preventDefault();


const Carousel = (props) => {

  const [credits, setCredits] = React.useState([]);

  const items = credits.map((c) => {
    <div className="carouselItem">
      <img
        src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
        alt={c?.name}
        onDragStart={handleDragStart}
        className="carouselItem__img"
      />
      <b className="carouselItem__txt">{c?.name}</b>
    </div>
  });

  const fetchCredits = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/${props.media_type}/${props.id}/credits?api_key=6ee6c42558d75845efae40fb542cf6c3&language=en-US`);
    const data = await response.json();
    setCredits(data.cast);
  };

  React.useEffect(() => {
    fetchCredits();
 }, []);

  return (
    <AliceCarousel
      mouseTracking
      infinite
      disableDotsControls
      disableButtonsControls
      items={items}
      autoPlay
    />
  );
}

export default Carousel;