import React from 'react';
import { Button } from 'react-bootstrap';
import PlaceOrderButtonStyles from './PlaceOrderButton.module.css';

const PlaceOrderButton = (props) => {
    return(
        <div className={PlaceOrderButtonStyles.placeOrderButton}>
            <Button variant="success">Place Order</Button>
        </div>
    )
}

export default PlaceOrderButton;
