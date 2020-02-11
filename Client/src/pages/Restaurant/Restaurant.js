import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import image from '../../assets/restaurant.jpeg';
import 'axios';
import './Restaurant.css';
import Axios from 'axios';
import swal from 'sweetalert'

class Restaurant extends Component {

    constructor() {
        super();

        this.state = {
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            countPeople: 0,
            submitted: false
        }

        this.handlefirstNameChange = this.handlefirstNameChange.bind(this);
        this.handlelastNameChange = this.handlelastNameChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleCountPeopleChange = this.handleCountPeopleChange.bind(this);
        this.handleReserveButtonClicked = this.handleReserveButtonClicked.bind(this);
    }

    handlefirstNameChange(event) {
        this.setState({
            firstName: event.target.value,
        });
    }

    handlelastNameChange(event) {
        this.setState({
            lastName: event.target.value,
        });
    }

    handlePhoneChange(event) {
        this.setState({
            phone: event.target.value,
        });
    }

    handleEmailChange(event) {
        this.setState({
            email: event.target.value,
        });
    }

    handleCountPeopleChange(event) {
        this.setState({
            countPeople: event.target.value,
        });
    }

    handleReserveButtonClicked() {
        this.setState({
            submitted: true
        });

        if (this.formIsValid()) {
            this.sendData();
        }
    }

    formIsValid() {
        const { firstName, lastName, phone, email, startDate, endDate } = this.state;
        return firstName !== '' && lastName !== '' && phone !== '' && email !== ''
    }

    sendData() {
        const url = 'http://localhost:8080/api/tables/reservations';
        const { firstName: firstName, lastName, phone, email, countPeople } = this.state;
        const data = {
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            email: email,
            countPeople: countPeople
        }
        Axios.post(url, data).then(() => {
            swal("Thank you for your reservation!", "We will contact you for more information!", "success");
            this.props.history.push('/');
        }).catch((error) => {
            swal("Ooops!", "Something wrong happened! Sorry!", "danger");
            console.error(error);
        });
    }

    handleRequiredInputValidation(value) {
        return value === '' && this.state.submitted;
    }

    handleRequiredDateValidation(value) {
        return value === undefined && this.state.submitted;
    }

    render() {
        const {
            firstName, lastName, phone, email, countPeople
        } = this.state;

        return (

            <Container maxWidth="md">
                <img className="restaurant-image" src={image} alt="Front view" />
                <div className="restaurant-text">
                    <h3 className="restaurant-title">First class restaurant</h3>
                </div>

                <Container className="reservation-container" maxWidth="md">
                    <div className="reservation-input">
                        <TextField
                            error={this.handleRequiredInputValidation(firstName)}
                            label="Fist Name*"
                            value={firstName}
                            onChange={this.handlefirstNameChange}
                        />
                    </div>
                    <div className="reservation-input">
                        <TextField
                            error={this.handleRequiredInputValidation(lastName)}
                            label="Last Name*"
                            value={lastName}
                            onChange={this.handlelastNameChange}
                        />
                    </div>
                    <div className="reservation-input">
                        <TextField
                            error={this.handleRequiredInputValidation(phone)}
                            label="Phone Number*"
                            value={phone}
                            onChange={this.handlePhoneChange}
                        />
                    </div>
                    <div className="reservation-input">
                        <TextField
                            error={this.handleRequiredInputValidation(email)}
                            label="E-mail*"
                            value={email}
                            onChange={this.handleEmailChange}
                        />
                    </div>
                    <div className="reservation-input">
                        <TextField
                            error={this.handleRequiredInputValidation(countPeople)}
                            label="Count people*"
                            value={countPeople}
                            onChange={this.handleCountPeopleChange}
                        />
                    </div>
                    <Button
                        variant="contained"
                        onClick={this.handleReserveButtonClicked}
                    >Book</Button>
                </Container>
            </Container>
        );
    }
}

export default reservationForm;
