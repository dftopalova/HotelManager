import React, {Component} from 'react';
import Container from '@material-ui/core/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Carousel} from 'react-bootstrap';
import CarouselItem from '../../components/CarouselItem/CarouselItem';
import images from '../../utility/carousel-images';

class Gallery extends Component {

    constructor() {
        super();
        this.state = {
            index: 0,
            direction: null,
        };
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(selectedIndex, e) {
        this.setState({
            index: selectedIndex,
            direction: e.direction,
        });
    }

    getCarouselItems() {
        return images.map((image, index) => {
            return (
                <Carousel.Item>
                    <CarouselItem key={image+"-"+index} src={image} alt={index} />
                </Carousel.Item>
            );
        });
    }

    render() {
        const {index, direction} = this.state;
        const carouselItems = this.getCarouselItems();
        console.log(carouselItems);

        return (
            <Container maxWidth="md">
                <Carousel index={index} direction={direction} onSelect={this.handleSelect} >
                    {carouselItems}
                </Carousel>
            </Container>
        );
    }
}

export default Gallery;
