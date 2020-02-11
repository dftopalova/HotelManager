import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import logo from '../../assets/logo.png';
import './NavigationBar.css';

class NavigationBar extends Component {

    constructor() {
        super();
        this.navigateToHome = this.navigateToHome.bind(this);
        this.navigateToGallery = this.navigateToGallery.bind(this);
        this.navigateToRooms = this.navigateToRooms.bind(this);
        this.navigateToContacts = this.navigateToContacts.bind(this);
    }

    navigateToHome() {
        this.props.history.push('/');
    }

    navigateToGallery() {
        this.props.history.push('/gallery');
    }

    navigateToRooms() {
        this.props.history.push('/rooms');
    }

    navigateToContacts() {
        this.props.history.push('/contacts');
    }
    
    render() {
        return (
            <div className="navigation-container">
                <img className="navigation-image" src={logo} alt="logo" />
                <div>
                    <Button
                        className="navigation-button"
                        variant="contained"
                        onClick={this.navigateToHome}
                    >Home</Button>
                    <Button
                        className="navigation-button"
                        variant="contained"
                        onClick={this.navigateToRooms}
                    >Rooms</Button>
                    <Button
                        className="navigation-button"
                        variant="contained"
                        onClick={this.navigateToGallery}
                    >Gallery</Button>
                    <Button
                        className="navigation-button"
                        variant="contained"
                        onClick={this.navigateToContacts}
                    >Contacts</Button>
                </div>
            </div>
        );
    }
}

export default NavigationBar;
