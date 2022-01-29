import React from "react";
import {Container, Form, Row, Button} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import registerUser from '../../../TokenManagement/RegisterUser';
import loginimageone from '../../../Media/Images/LoginImages/New folder/loginimageone.jpg';
// import loginimagetwo from '../../../Media/Images/LoginImages/loginimagetwo.jpg';
// import loginimagethree from '../../../Media/Images/LoginImages/loginimagethree.jpg';
// import loginimagefour from '../../../Media/Images/LoginImages/loginimagefour.jpg';
// import loginimagefive from '../../../Media/Images/LoginImages/loginimagefive.jpg';
// import loginimagesix from '../../../Media/Images/LoginImages/loginimagesix.jpg';
// import loginimageseven from '../../../Media/Images/LoginImages/loginimageseven.jpg';

const userBackEndKeys = {
    firstName:'junkuser_first_name',
    lastName:'junkuser_last_name',
    emailAddress: 'email',
    password:'password',
    mobileNumber:'junkuser_mobile_number',
    address:'junkuser_address',
}

const registerFormInitialValues = {
    firstName:'',
    lastName:'',
    emailAddress: '',
    password:'',
    mobileNumber:'',
    address:'',
}

const formatRegisterFormValues = (metrics, values) => {
    let formData = new FormData();
    Object.keys(values).map(key => {
        formData.append(registerFormInitialValues[key], values[key])
    })
    return formData;
}

const Register = (registerProps) => {
    const registerFormValidationSchema = Yup.object().shape({
        firstName: Yup.string().required(),
        lastName:Yup.string().ensure(),
        emailAddress: Yup.string().email().required(),
        password:Yup.string().required().min(8, 'Password should be minimum 8 characters').max(15, 'Password should be maximum 12 characters'),
        mobileNumber:Yup.string().required().matches(/^[\d]{10}$/, 'Please provide valid mobile number.'),
        address:Yup.string().required(),

    })
    // Creating history object, to redirect user to homepage or register page.
    const historyObj = useHistory();

    // Error message styling component.
    const errorMessage = (message) => {return(<div style={{color:'red'}}>{message}</div>)}

    return(
        <Formik
            initialValues={registerFormInitialValues}
            validationSchema={registerFormValidationSchema}
            onSubmit = {async (values, actions) => {
                const useFormData = formatRegisterFormValues(registerFormInitialValues, values)
                const registerStatus = await registerUser(useFormData)
                if(registerStatus === 'success'){
                    historyObj.push('/login')
                }else{
                    historyObj.push('/register')
                }
            }}
        >
            {(props) => {
                return(
                    <section className="vh-100">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-6 text-black">
                                    <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                                        <Form style={{width: "23rem", paddingTop:"10%"}} onSubmit={props.handleSubmit}>
                                            <h3 className="fw-normal mb-3 pb-3" style={{letterSpacing: "1px", font:"16", fontFamily:"Rock Salt"}}>Junkyard</h3>
                                            <div className="form-outline mb-4">
                                                <Form.Label>First Name</Form.Label>
                                                <Form.Control
                                                    name="firstName"
                                                    id="firstName"
                                                    type="text"
                                                    placeholder="@firstname"
                                                    value={props.values.firstName}
                                                    onChange={props.handleChange}
                                                    onBlur={props.handleBlur}
                                                />
                                                {props.touched.firstName && props.errors.firstName ? errorMessage(props.errors.firstName) : null}
                                            </div>
                                            <div className="form-outline mb-4">
                                                <Form.Label>Last Name</Form.Label>
                                                <Form.Control
                                                    name="lastName"
                                                    id="lastName"
                                                    type="text"
                                                    placeholder="@lastname"
                                                    value={props.values.lastName}
                                                    onChange={props.handleChange}
                                                    onBlur={props.handleBlur}
                                                />
                                                {props.touched.lastName && props.errors.lastName ? errorMessage(props.errors.lastName) : null}
                                            </div>
                                            <div className="form-outline mb-4">
                                                <Form.Label>Email Address</Form.Label>
                                                <Form.Control
                                                    name="emailAddress"
                                                    id="emailAddress"
                                                    type="email"
                                                    placeholder="@email"
                                                    value={props.values.emailAddress}
                                                    onChange={props.handleChange}
                                                    onBlur={props.handleBlur}
                                                />
                                                {props.touched.emailAddress && props.errors.emailAddress ? errorMessage(props.errors.emailAddress) : null}
                                            </div>
                                            <div className="form-outline mb-4">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control
                                                    name="password"
                                                    id="password"
                                                    type="password"
                                                    placeholder="@password"
                                                    value={props.values.password}
                                                    onChange={props.handleChange}
                                                    onBlur={props.handleBlur}
                                                />
                                                {props.touched.password && props.errors.password ? errorMessage(props.errors.password) : null}
                                            </div>
                                            <div className="form-outline mb-4">
                                                <Form.Label>Mobile Number</Form.Label>
                                                <Form.Control
                                                    name="mobileNumber"
                                                    id="mobileNumber"
                                                    type="number"
                                                    placeholder="@mobilenumber"
                                                    value={props.values.mobileNumber}
                                                    onChange={props.handleChange}
                                                    onBlur={props.handleBlur}
                                                />
                                                {props.touched.mobileNumber && props.errors.mobileNumber ? errorMessage(props.errors.mobileNumber) : null}
                                            </div>
                                            <div className="form-outline mb-4">
                                                <Form.Label>Address</Form.Label>
                                                <Form.Control
                                                    name="address"
                                                    id="address"
                                                    type="text"
                                                    placeholder="@address"
                                                    value={props.values.address}
                                                    onChange={props.handleChange}
                                                    onBlur={props.handleBlur}
                                                />
                                                {props.touched.address && props.errors.address ? errorMessage(props.errors.address) : null}
                                            </div>
                                            <div className="pt-1 mb-4">
                                                <Button size="lg" type="submit" variant="success">Create Account</Button>
                                            </div>
                                            <a href="/login" className="small text-muted">Terms of use.</a>
                                            <a href="/login" className="small text-muted">Privacy policy</a>
                                        </Form>
                                    </div>
                                </div>
                                <div className="col-sm-6 px-0 d-none d-sm-block">
                                    <img src={loginimageone} alt="Login image" className="w-100 vh-100" style={{objectFit: "cover", objectPosition: "left", height:"100%"}} />
                                </div>
                            </div>
                        </div>
                    </section>
                )
            }}
        </Formik>

    )
}


export default Register;
