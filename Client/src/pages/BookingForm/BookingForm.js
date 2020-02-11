import React, {Component} from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import 'axios';
import './BookingForm.css';
import Axios from 'axios';
import swal from 'sweetalert'

class BookingForm extends Component {

    constructor() {
        super();

        this.state = {
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            startDate: undefined,
            endDate: undefined,
            submitted: false,
            startDateFocused: false,
            endDateFocused: false,
        }

        this.handlefirstNameChange = this.handlefirstNameChange.bind(this);
        this.handlelastNameChange = this.handlelastNameChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleBookingButtonClicked = this.handleBookingButtonClicked.bind(this);
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

    handleBookingButtonClicked() {
        this.setState({
            submitted: true
        });

        if (this.formIsValid()) {
            this.sendData();
        }
    }

    formIsValid() {
        const {firstName, lastName, phone, email, startDate, endDate} = this.state;
        return firstName !== '' && lastName !== '' && phone !== '' && email !== '' &&
            startDate !== undefined && endDate !== undefined;
    }

    formatDate(date) {
        return date._d.toString().slice(4, 16)
    }

    sendData() {
        const url = 'http://localhost:8080/api/bookings';
        const {firstName: firstName, lastName, phone, email, startDate, endDate,} = this.state;
        const roomType = this.props.location.state.roomType;
        const data = {
            firstName:firstName,
            lastName: lastName,
            phone: phone,
            email: email,
            startDate: this.formatDate(startDate),
            endDate: this.formatDate(endDate),
            roomType: roomType
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
            firstName, lastName, phone, email, startDate, endDate, startDateFocused, endDateFocused
        } = this.state;

        const emptyDateClass = 'booking-empty-date';

        const startDateClass = this.handleRequiredDateValidation(startDate) ? emptyDateClass : '';
        const endDateClass = this.handleRequiredDateValidation(endDate) ? emptyDateClass : '';

        return (
            <Container className="booking-container" maxWidth="md">
                <div className="booking-input">
                    <TextField
                        error={this.handleRequiredInputValidation(firstName)}
                        label="Fist Name*"
                        value={firstName}
                        onChange={this.handlefirstNameChange}
                    />
                </div>
                <div className="booking-input">
                    <TextField
                        error={this.handleRequiredInputValidation(lastName)}
                        label="Last Name*"
                        value={lastName}
                        onChange={this.handlelastNameChange}
                    />
                </div>
                <div className="booking-input">
                    <TextField
                        error={this.handleRequiredInputValidation(phone)}
                        label="Phone Number*"
                        value={phone}
                        onChange={this.handlePhoneChange}
                    />
                </div>
                <div className="booking-input">
                    <TextField
                        error={this.handleRequiredInputValidation(email)}
                        label="E-mail*"
                        value={email}
                        onChange={this.handleEmailChange}
                    />
                </div>
                <div className="booking-input">
                    <div>Check-in Date</div>
                    <span className={startDateClass}>
                        <SingleDatePicker
                            id="start-date-picker"
                            date={startDate}
                            onDateChange={(date) => this.setState({startDate: date})}
                            focused={startDateFocused}
                            onFocusChange={(focused) => this.setState({startDateFocused: focused})}
                            onClose={() => this.setState({startDateFocused: false})}
                        />
                    </span>
                </div>
                <div className="booking-input">
                    <div>Check-out Date</div>
                    <span className={endDateClass}>
                        <SingleDatePicker
                            id="end-date-picker"
                            date={endDate}
                            onDateChange={(date) => this.setState({endDate: date})}
                            focused={endDateFocused}
                            onFocusChange={(focused) => this.setState({endDateFocused: focused})}
                            onClose={() => this.setState({endDateFocused: false})}
                        />
                    </span>
                </div>
                <Button
                    variant="contained"
                    onClick={this.handleBookingButtonClicked}
                >Book</Button>
            </Container>
        );
    }
}

export default BookingForm;
