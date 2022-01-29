import React, { useState } from 'react';
import {InputGroup, Row, Form, Col, Button, FloatingLabel} from 'react-bootstrap';
import AddressStyles from './Address.module.css';

const Address = (props) => {
    const [deliveryDetails, setDeliveryDetails] = useState({address:'', mobileNumber:''})
    const [fieldMessage, setFieldMessage] = useState('')

    const updateDeliveryDetails = (event, key) => {
        setDeliveryDetails(
            prevState => {
                return {
                    ...prevState,
                    [[key]] : event.target.value
                }
            }
        )
    }

    const uploadOrderWithDeliverDetails = () => {
        let validateMobileNumber = deliveryDetails.mobileNumber.match(/^\d{10}$/)
        if( validateMobileNumber && deliveryDetails.address){
            setFieldMessage('')
            props.placeOrder({...deliveryDetails})
        }else if (!validateMobileNumber){
            setFieldMessage('Mobile Number is not valid')
        }
    }

    return(
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Delivery Address</Form.Label>
                <Form.Control as="textarea" aria-label="With textarea" className={AddressStyles.addressForm} required onChange={(e) => updateDeliveryDetails(e, 'address')}/>
                {!deliveryDetails.address && (<Form.Text>Please provide valid address.</Form.Text>)}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control type="text" className={AddressStyles.mobileForm} required onChange={(e) => updateDeliveryDetails(e, 'mobileNumber')}/>
                {fieldMessage && (<Form.Text>{fieldMessage}</Form.Text>)}
            </Form.Group>
            <div style={{paddingLeft:"88%", paddingTop:"5%"}}>
                <Button
                    variant="success"
                    className={AddressStyles.placeOrderButton}
                    enabled="true"
                    onClick={() => uploadOrderWithDeliverDetails()}>Place Order</Button>
            </div>
        </Form>

    )
}

export default Address;
