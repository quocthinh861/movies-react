import React, { useState, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { noPicture, img_300 } from '../../config/config';
import './Carousel.css';

const handleDragStart = (e) => e.preventDefault();

const items = [
  <img src="path-to-img" onDragStart={handleDragStart} />,
  <img src="path-to-img" onDragStart={handleDragStart} />,
  <img src="path-to-img" onDragStart={handleDragStart} />,
];

const Gallery = (props) => {
    
    const [credits, setCredits] = useState([]);

    const items = credits?.map((c) => (
        <div className='carouselItem'>
            <img src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture }
                onDragStart={handleDragStart}
                className='carouselItem_img'/>
            <b className='carouselItem_txt'>{c?.name}</b>
        </div>

    ));

    const fetchCredits = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/${props.media_type}/${props.id}/credits?api_key=6ee6c42558d75845efae40fb542cf6c3&language=en-US`);
        const data = await response.json();
        setCredits(data.cast);
    };

    const responsive = {
        0: {
          items: 3,
        },
        512: {
          items: 5,
        },
        1024: {
          items: 7,
        },
    };

    useEffect(() => {
        fetchCredits();
    }, [])

    return (
        <AliceCarousel 
                    mouseTracking 
                    items={items}
                    infinite
                    responsive={responsive}
                    disableDotsControls
                    disableButtonsControls
                    autoPlay />
    );
}

export default Gallery;