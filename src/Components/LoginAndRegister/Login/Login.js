import React, {useContext} from "react";
import {Container, Form, Row, Col, Button, Nav} from 'react-bootstrap';
import {Redirect, useHistory } from 'react-router-dom';
import CoreProviderContext from '../../../Context/CoreProviderContext/CoreProviderContext';
import {Formik} from 'formik';
import { useToasts } from 'react-toast-notifications';
import * as Yup from 'yup';
import axios from 'axios';
import loginStyles from './Login.module.css';
import getLoginToken from '../../../TokenManagement/LoginToken';
import loginimageone from '../../../Media/Images/LoginImages/New folder/loginimageone.jpg';
// import loginimagetwo from '../../../Media/Images/LoginImages/loginimagetwo.jpg';
// import loginimagethree from '../../../Media/Images/LoginImages/loginimagethree.jpg';
// import loginimagefour from '../../../Media/Images/LoginImages/loginimagefour.jpg';
// import loginimagefive from '../../../Media/Images/LoginImages/loginimagefive.jpg';
// import loginimagesix from '../../../Media/Images/LoginImages/loginimagesix.jpg';
// import loginimageseven from '../../../Media/Images/LoginImages/loginimageseven.jpg';


const AXIOSLOGINCONFIG = {
    baseURL : 'http://localhost:8080/api/auth/',
    withCredentials : true,
    headers:{
        'Content-Type':'application/json',
        'Accept':'application/json'
    }
}

const Login = (props) => {

    const historyObj = useHistory();

    const {addToast} = useToasts();

    const loginValidationSchema = Yup.object().shape({
        emailAddress: Yup.string().email().required('Please provide valid email address.'),
        password: Yup.string().required('Please provide password.')
    })
    return(
        <CoreProviderContext.Consumer>
            {({updateUserData}) => (
                <Formik
                    initialValues={{emailAddress:"", password:""}}
                    validationSchema={loginValidationSchema}
                    onSubmit = {
                        async (values, actions) => {
                            const loginStatus = await getLoginToken({
                                email: values.emailAddress,
                                password: values.password
                            })
                            if(loginStatus.message === 'success'){
                                // Retrieve user information and update roles into CoreProviderContext.
                                await props.updateUserRoles(updateUserData)
                                addToast("Login Successfull. Order some food, be happy and let us be happy for you!!", {appearance: 'success', autoDismiss: true})
                                historyObj.push('/')
                            }else{
                                addToast("Invalid username or password. Please provide valid username and password.", {appearance: 'error', autoDismiss: true})
                                historyObj.push('/login/')
                            }
                        }
                    }
                >
                    {(props) => {
                        return(
                            <section className="vh-100">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-sm-6 text-black">
                                            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                                                <Form style={{width: "23rem", paddingTop:"20%"}} onSubmit={props.handleSubmit}>
                                                    <h3 className="fw-normal mb-3 pb-3" style={{letterSpacing: "1px", font:"16", fontFamily:"Rock Salt"}}>Junkyard</h3>

                                                    <div className="form-outline mb-4">
                                                        <Form.Control
                                                            id="emailAddress"
                                                            name="emailAddress"
                                                            type="email"
                                                            value={props.values.emailAddress}
                                                            onChange={props.handleChange}
                                                            onBlur={props.handleBlur}
                                                        />
                                                        <Form.Label>Email Address</Form.Label>
                                                        {props.errors.emailAddress && props.touched.emailAddress ? (<div style={{color:'red'}}>{props.errors.emailAddress}</div>) : null}
                                                    </div>

                                                    <div className="form-outline mb-4">
                                                        <Form.Control
                                                            id="password"
                                                            name="password"
                                                            type="password"
                                                            value={props.values.password}
                                                            onChange={props.handleChange}
                                                            onBlur={props.handleBlur}
                                                        />
                                                        <Form.Label>Password</Form.Label>
                                                        {props.errors.password && props.touched.password ? (<div style={{color:'red'}}>{props.errors.password}</div>) : null}
                                                    </div>

                                                    <div className="pt-1 mb-4">
                                                        <Button size="lg" type="submit" variant="success">Login</Button>
                                                    </div>

                                                    <a className="small text-muted" href="/login">Forgot password?</a>
                                                    <p className="mb-5 pb-lg-2" style={{color: "#393f81"}}>Wanna be a foodjunky? <a href='/register' style={{color: "#393f81"}}>Register here</a></p>
                                                    <a href="/login" className="small text-muted">Terms of use.</a>
                                                    <a href="/login" className="small text-muted">Privacy policy</a>
                                                </Form>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 px-0 d-none d-sm-block" >
                                            <img src={loginimageone} alt="Login image" className="w-100 vh-100" style={{objectFit: "cover", objectPosition: "left"}} />
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )
                    }}
                </Formik>
            )}
        </CoreProviderContext.Consumer>

    )
}


export default Login;
