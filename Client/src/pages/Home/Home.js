import React, {Component} from 'react';
import Container from '@material-ui/core/Container';
import image from '../../assets/frontView.jpg';
import {homePageText} from '../../utility/text';
import './Home.css';

class Home extends Component {

    render() {
        return (
            <Container maxWidth="md">
                <img className="home-page-image" src={image} alt="Front view" />
                <div className="home-page-text">
                    <h3 className="home-page-title">Overview</h3>
                    <p>{homePageText}</p>
                </div>
            </Container>
        );
    }
}

export default Home;
