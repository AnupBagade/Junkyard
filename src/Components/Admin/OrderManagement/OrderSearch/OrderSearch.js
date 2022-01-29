import React, { useState } from 'react';
import {Formik} from 'formik';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import {Form, Col, Row, Button, Container, Card} from 'react-bootstrap';
import CustomDateRange from '../../../CustomDateRange/CustomDateRange';
import refreshToken from '../../../../TokenManagement/RefreshToken';


const ordersQueryParameters = {
    'orderId': 'order_id',
    'itemType': 'item_type',
    'userMobileNumber': 'user_mobile_number',
    'userEmailId':'user_mail_id',
    'startDate': 'start_date',
    'endDate': 'end_date',
    'orderStatus': 'order_status',
    'orderSubStatus':'order_substatus',
    'orderApprovedEmployee' : 'order_approved_employee_id',
    'orderDeliveryEmployee' : 'order_delivery_employee_id'
}

const generateParamsObject = (values, metricsName) => {
    let temp = Object()
    Object.keys(values).map(queryParameter => {
        if(values[queryParameter]){
            return temp[ordersQueryParameters[queryParameter]] = values[queryParameter]
        }
    })

    return temp
}

const PENDINGORDERSTATUS = 'pending'

const APPROVEDORDERSTATUS = 'approved'

let axiosRequestController = null;

const OrderSearch = (orderProps) => {
    const [selectedDateRange, setSelectedDateRange] = useState({start:null, end:null})
    const orderSearchValidation = Yup.object().shape({
        orderId: Yup.number(),
        itemType:Yup.string(),
        userMobileNumber:Yup.number().positive('Mobile Number should be positive'),
        userEmailId:Yup.string(),
        orderStatus:Yup.string(),
        orderSubStatus:Yup.string(),
        orderApprovedEmployee:Yup.number().positive('Employee identification number must be valid.'),
        orderDeliveryEmployee:Yup.number().positive('Employee identification number must be valid.')
    })
    const formReset = (funcOne) => {
        funcOne();
        setSelectedDateRange(prevState => {return {start:null, end:null}});
    }
    return(
        <Card>
            <Card.Header  as="h5" style={{backgroundColor:"#212529", color:"white"}}>Search Order</Card.Header>
            <Card.Body>
                <Formik
                    enableReinitialize
                    initialValues={orderProps.orderSearchFormInitialValues}
                    validationSchema={orderSearchValidation}
                    onSubmit={ async (values,actions) => {
                        // Set loading to true of OrderManagement State
                        orderProps.customLoaderHandler(true)

                        if(axiosRequestController){
                            axiosRequestController.cancel()
                        }
                        // Add start_date and end_date to values object.
                        if (selectedDateRange.start && selectedDateRange.end ){
                            values['startDate'] = selectedDateRange.start.getFullYear()+'-'+(selectedDateRange.start.getMonth()+1)+'-'+selectedDateRange.start.getDate()
                            values['endDate'] = selectedDateRange.end.getFullYear()+'-'+(selectedDateRange.end.getMonth()+1)+'-'+selectedDateRange.end.getDate()
                        }
                        // Create parameter object that will be sent to Backend API.
                        let axiosParams = generateParamsObject(values,ordersQueryParameters);
                        axiosRequestController = axios.CancelToken.source()
                        orderProps.getOrders({orderStatus:values['orderStatus'], axiosParams: axiosParams})

                    }}
                >
                    {
                        props => {
                            return(
                                <Form id="orderSearchForm" onSubmit={props.handleSubmit}>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>Order ID</Form.Label>
                                            <Form.Control
                                                disabled={(Object.keys(props.touched).length && !('orderId' in props.touched)) ? true : false}
                                                name="orderId"
                                                id="orderId"
                                                type="number"
                                                placeholder="Enter order ID"
                                                value={props.values.orderId}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                             />
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label>Item Type</Form.Label>
                                            <Form.Control
                                                disabled={'orderId' in props.touched ? true : false}
                                                as="select"
                                                name="itemType"
                                                id="itemType"
                                                type="text"
                                                placeholder="Select itemType"
                                                value={props.values.itemType}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            >
                                                <option value="">Select item type</option>
                                                <option value="burger">Burger</option>
                                                <option value="pizza">Pizza</option>
                                                <option value="fries">Fries</option>
                                                <option value="pasta">Pasta</option>
                                                <option value="donught">Donught</option>
                                                <option value="dessert">Dessert</option>
                                                <option value="chicken">Chicken</option>
                                                <option value="seafood">Sea Food</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>Order Status</Form.Label>
                                            <Form.Control
                                                disabled={'orderId' in props.touched ? true : false}
                                                as="select"
                                                name="orderStatus"
                                                id="orderStatus"
                                                type="text"
                                                placeholder="Select order status"
                                                value={props.values.orderStatus}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}>
                                                <option value="pending">Pending</option>
                                                <option value="approved">Approved</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Form.Row>
                                    {props.values.orderStatus==="approved" ?
                                        <Form.Row>
                                            <Form.Group as={Col}>
                                                <Form.Label>Order Sub-Status</Form.Label>
                                                <Form.Control
                                                    disabled={'orderId' in props.touched ? true : false}
                                                    as="select"
                                                    name="orderSubStatus"
                                                    id="orderSubStatus"
                                                    type="text"
                                                    placeholder="Select Order Sub-Status"
                                                    value={props.values.orderSubStatus}
                                                    onBlur={props.handleBlur}
                                                    onChange={props.handleChange}>
                                                    <option value="">Select order sub-status</option>
                                                    <option value="inprogress">In-Progress</option>
                                                    <option value="dispatched">Dispatched</option>
                                                    <option value="delivered">Delivered</option>
                                                    <option value="completed">Completed</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group as={Col}>
                                                <Form.Label>Order Approved Employee ID</Form.Label>
                                                <Form.Control
                                                    disabled={'orderId' in props.touched ? true : false}
                                                    name="orderApprovedEmployee"
                                                    id="orderApprovedEmployee"
                                                    type="number"
                                                    value={props.values.orderApprovedEmployee}
                                                    onBlur={props.handleBlur}
                                                    onChange={props.handleChange}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col}>
                                                <Form.Label>Order Delivery Employee ID</Form.Label>
                                                <Form.Control
                                                    disabled={'orderId' in props.touched ? true : false}
                                                    id="orderDeliveryEmployee"
                                                    name="orderDeliveryEmployee"
                                                    type="number"
                                                    value={props.values.orderDeliveryEmployee}
                                                    onBlur={props.handleBlur}
                                                    onChange={props.handleChange}
                                                />
                                            </Form.Group>
                                        </Form.Row>
                                        : null
                                    }
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>user Mobile Number</Form.Label>
                                            <Form.Control
                                                disabled={'orderId' in props.touched ? true : false}
                                                name="userMobileNumber"
                                                id="userMobileNumber"
                                                type="number"
                                                placeholder="Enter user mobile number"
                                                value={props.values.userMobileNumber}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                             />
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label>User Email Address</Form.Label>
                                            <Form.Control
                                                disabled={'orderId' in props.touched ? true : false}
                                                name="userEmailId"
                                                id="userEmailId"
                                                type="string"
                                                placeholder="Enter user email address"
                                                value={props.values.userEmailId}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                             />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>Order Date Range</Form.Label>
                                            <CustomDateRange dateRangeHandler={setSelectedDateRange} startDate={selectedDateRange.start}
                                             endDate={selectedDateRange.end} disabledStatus={'orderId' in props.touched ? true : false}/>
                                        </Form.Group>
                                    </Form.Row>
                                    <Button  size="md" style={{backgroundColor:"#0A62D0"}} onClick={() => {formReset(props.handleReset)}}>Reset Fields</Button>
                                    <Button type="submit" variant="success" size="md" style={{float:"right"}}>Submit</Button>
                                </Form>
                            )
                        }
                    }
                </Formik>
            </Card.Body>
        </Card>
    )
}

OrderSearch.propTypes = {
    orderSearchFormInitialValues: PropTypes.object,
    updateOrderResultsHandler: PropTypes.func
}

export default OrderSearch;
