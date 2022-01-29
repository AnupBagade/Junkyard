import React, { useState } from 'react';
import {Formik} from 'formik';
import {Form, Row, Col, Card, Button} from 'react-bootstrap';
import * as Yup from 'yup';
import axios from 'axios'
import CustomLoader from '../../../CustomLoader/CustomLoader';
import { Redirect } from 'react-router-dom';
import refreshToken from '../../../../TokenManagement/RefreshToken';


const ADDEMPLOYEEFORMFIELDS = {
    'employeeLastName': '',
    'employeeFirstName': '',
    'employeeEmailId': '',
    'employeeMobileNumber': '',
    'employeeGender': '',
    'employeeAge': '',
    'employeeAddress': '',
}

const ADDEMPLOYEEBACKENDFIELDS = {
    'employeeLastName': 'junkuser_last_name',
    'employeeFirstName': 'junkuser_first_name',
    'employeeEmailId': 'email',
    'employeeMobileNumber': 'junkuser_mobile_number',
    'employeeAge': 'junkuser_age',
    'employeeGender': 'junkuser_gender',
    'employeeAddress': 'junkuser_address'
}

const AXIOSEMPLOYEESLIST = {
    baseURL:'http://localhost:8080/api/',
    withCredentials: true,
    headers: {
        'content-type': 'multipart/form-data'
    }
}

const AXIOSADDEMPLOYEEENDPOINT = 'junkusers/';

const PASSWORREQUIREMENTS = {
    characters : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@#$%^&*()><1234567890',
    passwordLength : 10
}

const generatePassword = () => {
    let passwordObj = Array();
    const passwordCharactersLength = PASSWORREQUIREMENTS.characters.length
    for(let i=0;i<PASSWORREQUIREMENTS.passwordLength; i++){
        passwordObj.push(PASSWORREQUIREMENTS.characters[Math.floor(Math.random() * passwordCharactersLength)])
    }
    return passwordObj.join('')
}

const generateParamsObject = (values, metrics) => {
    let formData = new FormData()
    Object.keys(values).map(value => {
        formData.append(metrics[value], values[value])
    })
    // Adding user type as employee
    formData.append('junkuser_is_employee', 'True')
    // Generating temporary password and sending to server.
    formData.append('password', generatePassword())
    return formData
}

const formatErrorMessages = (errorObj) => {
    let temp = []
    Object.values(errorObj).map(val => {
        temp.push(val[0])
    })
    return temp
}

let axiosRequestController = null;

const AddEmployee = (employeeProps) => {

    const [loadingStatus, setLoadingStatus] = useState(false)
    const [requestInfo, setRequestInfo] = useState({'message':'', 'color':''})

    const addEmployeeValidation = Yup.object().shape({
        employeeLastName:Yup.string().required('Please provide employee last name.'),
        employeeFirstName:Yup.string().required('Please provide employee first name.'),
        employeeEmailId:Yup.string().required('Please provide email id.'),
        employeeMobileNumber:Yup.string().matches(/^[\d]{10}$/, 'Please provide valid 10 digit mobile number')
        .required('Please provide employee mobile number.'),
        employeeGender:Yup.string().required('Please select gender.'),
        employeeAge:Yup.number().moreThan(17, "Employee age should be minimum 18").required('Please provide employee age.'),
        employeeAddress:Yup.string().required('Please provide employee address')
    })
    return(
        <div style={{paddingBottom:"5%"}}>
            <Card>
                <Card.Header as="h5" style={{backgroundColor:"#212529", color:"white"}}>Add Employee</Card.Header>
                <Card.Body>
                    <Formik
                        enableReinitialize
                        initialValues={ADDEMPLOYEEFORMFIELDS}
                        validationSchema={addEmployeeValidation}
                        onSubmit={async(values, actions) => {
                            // Set loading status to true
                            setLoadingStatus(prevState => true)
                            // Check for duplicate requests
                            if(axiosRequestController){
                                axiosRequestController.cancel();
                            }
                            // Generate params object and make call to employee end point.
                            const addEmployeeFormData = generateParamsObject(values,ADDEMPLOYEEBACKENDFIELDS )
                            const axiosAddEmployee = axios.create(AXIOSEMPLOYEESLIST)
                            axiosRequestController = axios.CancelToken.source()

                            axiosAddEmployee.interceptors.response.use(
                                (response) => {return response},
                                (error) => {
                                    const originalRequest = error.config;
                                    const refreshStatus = refreshToken();
                                    if(refreshStatus.status === 'success'){
                                        axios(originalRequest)
                                    }else if(refreshStatus.status === 'failed'){
                                        return (<Redirect to={{pathname:'/login/'}}/>)
                                    }

                                    return Promise.reject(error);
                                }
                            )

                            await axiosAddEmployee.post(
                                AXIOSADDEMPLOYEEENDPOINT,
                                addEmployeeFormData,
                                {cancelToken:axiosRequestController.token})
                            .then(resp => {
                                axiosRequestController = null;
                                if(resp.status===201){
                                    setRequestInfo((prevState) => {return {...prevState, ['message']: 'Employee is created.', ['color']:'green'}})
                                }else{
                                    console.log(resp)
                                    setRequestInfo((prevState) => {return {...prevState, ['message']: 'Employee is not created.', ['color']:'red'}})
                                }
                            })
                            .catch(err => {
                                if(axios.isCancel(err)){
                                    console.log('request has been cancelled');
                                }
                                console.log(err.response)
                                setRequestInfo((prevState) => {return {...prevState, ['message']: formatErrorMessages(err.response.data), ['color']:'red'}})
                            })
                            // Update loading status to false and display confirmation.
                            setLoadingStatus(prevState => false)
                            // Reset form
                            actions.setSubmitting(false)
                        }}
                    >
                        {props => {
                            return(
                                <Form id="addEmployee" onSubmit={props.handleSubmit}>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>Employee LastName</Form.Label>
                                            <Form.Control
                                                id="employeeLastName"
                                                name="employeeLastName"
                                                type="text"
                                                placeholder="employee lastname"
                                                value={props.values.employeeLastName}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            />
                                            {props.errors.employeeLastName && props.touched.employeeLastName ? (<div style={{color:"red"}}>{props.errors.employeeLastName}</div>) : null}
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label>Employee FirstName</Form.Label>
                                            <Form.Control
                                                id="employeeFirstName"
                                                name="employeeFirstName"
                                                type="text"
                                                placeholder="employee firstname"
                                                value={props.values.employeeFirstName}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            />
                                            {props.errors.employeeFirstName && props.touched.employeeFirstName ? (<div style={{color:"red"}}>{props.errors.employeeFirstName}</div>) : null}
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>Employee Email ID</Form.Label>
                                            <Form.Control
                                                id="employeeEmailId"
                                                name="employeeEmailId"
                                                type="text"
                                                placeholder="employeeName@junkyard.com"
                                                value={props.values.employeeEmailId}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            />
                                            {props.errors.employeeEmailId && props.touched.employeeEmailId ? (<div style={{color:"red"}}>{props.errors.employeeEmailId}</div>) : null}
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label>Employee Mobile Number</Form.Label>
                                            <Form.Control
                                                id="employeeMobileNumber"
                                                name="employeeMobileNumber"
                                                type="text"
                                                placeholder="**10 digits**"
                                                value={props.values.employeeMobileNumber}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            />
                                            {props.errors.employeeMobileNumber && props.touched.employeeMobileNumber ? (<div style={{color:"red"}}>{props.errors.employeeMobileNumber}</div>) : null}
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>Employee Age</Form.Label>
                                            <Form.Control
                                                id="employeeAge"
                                                name="employeeAge"
                                                type="text"
                                                placeholder="Age should be minimum 18"
                                                value={props.values.employeeAge}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            />
                                            {props.errors.employeeAge && props.touched.employeeAge ? (<div style={{color:"red"}}>{props.errors.employeeAge}</div>) : null}
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label>Employee Gender</Form.Label>
                                            <Form.Control
                                                as="select"
                                                id="employeeGender"
                                                name="employeeGender"
                                                type="text"
                                                placeholder="Select gender"
                                                value={props.values.employeeGender}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            >
                                                <option value="male">Male</option>
                                                <option value="female">Femail</option>
                                                <option value="other">Other</option>
                                                <option value="not_to_specify">Not to specify</option>
                                            </Form.Control>
                                            {props.errors.employeeGender && props.touched.employeeGender ? (<div style={{color:"red"}}>{props.errors.employeeGender}</div>) : null}
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>Employee Address</Form.Label>
                                            <Form.Control
                                                id="employeeAddress"
                                                name="employeeAddress"
                                                type="text"
                                                placeholder="@address of employee"
                                                value={props.values.employeeAddress}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            />
                                            {props.errors.employeeAddress && props.touched.employeeAddress ? (<div style={{color:"red"}}>{props.errors.employeeAddress}</div>) : null}
                                        </Form.Group>
                                    </Form.Row>
                                    <Row style={{display: 'flex', justifyContent: 'center'}}>
                                      {loadingStatus && (<CustomLoader />)}
                                      {requestInfo.message && (<h6 style={{color:`${requestInfo.color}`}}>{requestInfo.message}</h6>)}
                                    </Row>

                                    <Button type="submit" variant="success" size="md" style={{float:"right"}}>Submit</Button>
                                </Form>
                            )
                        }}
                    </Formik>
                </Card.Body>
            </Card>
        </div>
    )
}


export default AddEmployee;
