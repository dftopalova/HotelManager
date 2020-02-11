import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import './Offer.css';

const Offer = ({title, src, alt="Offer Image", view, beds, smoking,
    features, adults, kids, onClick}) => {

    return (
        <div>
            <Paper className="offer-container" elevation={2}>
                <div className="offer-content">
                    <h3>{title}</h3>
                    <Grid container spacing={2}>
                       <Grid item>
                            <img className="offer-image" src={src} alt={alt} />
                        </Grid>
                        <Grid item>
                            <div className="offer-info">
                                <div>View: {view} </div>
                                <div>Beds: {beds} </div>
                                <div>Smoking room: {smoking} </div>
                                <div>Features: {features} </div>
                                <div>Maximum Occupancy: {adults} Adult(s) {kids} Child(ren)</div>
                            </div>
                            <Button
                                className="offer-button"
                                variant="contained"
                                onClick={onClick}
                            >Book Online</Button>
                        </Grid>
                    </Grid>
                </div>
            </Paper>
        </div>
    );
}

export default Offer;
