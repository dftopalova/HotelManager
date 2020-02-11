import React, {Component} from 'react';
import Container from '@material-ui/core/Container';
import './Contacts.css';

class Contacts extends Component {
    render() {
        return (
            <Container maxWidth="md">
                <div className="contacts-container">
                        <h2>Contacts</h2>
                        <div className="contacts-section"><b>Phones: </b></div>
                        <div>0895432XXX</div>
                        <div>0895431XXX</div>

                        <div className="contacts-section"><b>E-mail: </b></div>
                        <div>random_hotel@gmail.com</div>

                        <div className="contacts-section"><b>Address: </b></div>
                        <div>Blvd "James Bourcher" №5, 1407, g.k. Lozenetz, Sofia</div>
                </div>
            </Container>
        );
    }
}

export default Contacts;
