import React, {Component} from 'react';
import Container from '@material-ui/core/Container';
import imageSingle from '../../assets/room1.jpg';
import imageDouble from '../../assets/room2.jpg';
import imageApartment from '../../assets/room8.jpg';
import imageVIP from '../../assets/room5.jpg';
import Offer from '../../components/Offer/Offer';
import './Rooms.css';

class Rooms extends Component {
    constructor() {
        super();

        this.navigateToBookingForm = this.navigateToBookingForm.bind(this);
    }
    
    navigateToBookingForm(roomType) {
        this.props.history.push('/book', {roomType: roomType});
    }
    
    render() {

        return (
            <Container maxWidth="md">
                <Offer
                    title="Single Room"
                    src={imageSingle}
                    view="Montain"
                    beds="Single"
                    smoking="No"
                    features="Wifi, TV"
                    adults="1"
                    kids="1"
                    onClick={() => this.navigateToBookingForm('single')}
                />
                <Offer
                    title="Double Room"
                    src={imageDouble}
                    view="Montain"
                    beds="Double"
                    smoking="No"
                    features="Bathtub, Wifi, TV"
                    adults="2"
                    kids="1"
                    onClick={() => this.navigateToBookingForm('double')}
                />
                <Offer
                    title="Apartment Room"
                    src={imageApartment}
                    view="Montain"
                    beds="Double and Single"
                    smoking="No"
                    features="Bathtub, Wifi, TV"
                    adults="3"
                    kids="2"
                    onClick={() => this.navigateToBookingForm('apartment')}
                />
                <Offer
                    title="VIP Room"
                    src={imageVIP}
                    view="Montain"
                    beds="King"
                    smoking="Yes"
                    features="Bathtub, Wifi, TV, Jacuzzi"
                    adults="3"
                    kids="1"
                    onClick={() => this.navigateToBookingForm('vip')}
                />
            </Container>
        );
    }
}

export default Rooms;
