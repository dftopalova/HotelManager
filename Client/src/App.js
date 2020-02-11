import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home/Home';
import Contacts from './pages/Contacts/Contacts';
import Gallery from './pages/Gallery/Gallery';
import Rooms from './pages/Rooms/Rooms';
import BookingForm from './pages/BookingForm/BookingForm';
import NavigationBar from './components/NavigationBar/NavigationBar';
import './App.css';

function App() {
  return (
    <Router>
      <Route path="/" component={NavigationBar} />
      <Route exact path="/" component={Home} />
      <Route path="/rooms" component={Rooms} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/contacts" component={Contacts} />
      <Route path="/book" render={(props) => {
        return <BookingForm {...props} />
      }} />
    </Router>
  );
}

export default App;
