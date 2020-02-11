import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Carousel} from 'react-bootstrap';

const CarouselItem = ({src, alt, children}) => {

    return (
        <div>
            <img className="d-block w-100" src={src} alt={alt} />
            <Carousel.Caption>
                {children}
            </Carousel.Caption>
        </div>
    );
}

export default CarouselItem;
