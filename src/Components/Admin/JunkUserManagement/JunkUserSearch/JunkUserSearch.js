import React from 'react';
import { Redirect } from 'react-router-dom';
import {Formik} from 'formik';
import { Button, Form, Card, Col} from 'react-bootstrap';
import * as Yup from 'yup';
import axios from 'axios';
import PropTypes from 'prop-types'
import refreshToken from '../../../../TokenManagement/RefreshToken';

const junkUserSearchQueryParameters = {
    'junkUserId': 'junkuser_id',
    'junkUserLastName': 'junkuser_last_name',
    'junkUserFirstName': 'junkuser_first_name',
    'junkUserEmailId': 'email',
    'junkUserMobileNumber': 'junkuser_mobile_number',
    'junkUserAge': 'junkuser_age',
    'junkUserGender': 'junkuser_gender'
}

const generateParamsObject = (values, metricsName, userType) => {
    let temp = Object()

    Object.keys(values).map(queryParameter => {
        if(values[queryParameter]){
            temp[metricsName[queryParameter]] = values[queryParameter]
        }
    })
    // adding user type
    temp[userType] = 'True'
    return temp
}

const AXIOSGETJUNKUSERSLIST = {
    baseURL:'http://localhost:8080/api/',
    withCredentials: true,
    headers:{
        'Content-Type' : 'application/json',
        'Accept': 'application/json'
    }
}

const AXIOSGETJUNKUSERENDPOINT = 'junkusers/'

let axiosRequestController = null;

const JunkUserSearch = (junkUserProps) => {
    const junkUserSearchValidation = Yup.object().shape({
        junkUserId:Yup.number().positive(),
        junkUserLastName:Yup.string(),
        junkUserFirstName:Yup.string(),
        junkUserEmailId:Yup.string(),
        junkUserMobileNumber:Yup.number().positive('Mobile number should be positive'),
        junkUserAge:Yup.number().positive('Age should be positive.'),
        junkUserGender:Yup.string(),
    })

    return(
        <Card>
            <Card.Header as="h5" style={{backgroundColor:"#212529", color:"white"}}>{`Search ${junkUserProps.title}`}</Card.Header>
            <Card.Body>
                <Formik
                    enableReinitialize
                    initialValues={junkUserProps.junkUserSearchFormInitialValues}
                    validationSchema={junkUserSearchValidation}
                    onSubmit = { async (values, actions) => {
                        // Set loadingStatus to true.
                        junkUserProps.customLoaderHandler(true)
                        // Check if there are any existing axios requests. If present cancel previous requests.
                        if(axiosRequestController){
                            axiosRequestController.cancel()
                        }
                        // Make axios request to employees endpoint.
                        let axiosParams = generateParamsObject(values, junkUserSearchQueryParameters, junkUserProps.userType)

                        let axiosGetEmployees = axios.create(AXIOSGETJUNKUSERSLIST)

                        axiosRequestController = axios.CancelToken.source()

                        axiosGetEmployees.interceptors.response.use(
                            (response) => {return response},
                            async (error) => {
                                if(error.response.status === 403){
                                    const refreshStatus = await refreshToken();
                                    if(refreshStatus.status === 'success'){
                                        return axios.request(error.config)
                                    }else if(refreshStatus.status === 'failed'){
                                        return (<Redirect to={{pathname:'/login/'}}/>)
                                    }
                                }

                                return Promise.reject(error);
                            }
                        )
                        await axiosGetEmployees.get(AXIOSGETJUNKUSERENDPOINT,
                             {
                                params:{...axiosParams},
                                cancelToken:axiosRequestController.token,
                            })
                        .then(resp => {
                            axiosRequestController = null
                            junkUserProps.updateJunkUserResultsHandler(resp.data)})
                        .catch(err => {
                            if(axios.isCancel(err)){
                                console.log('Request cancelled.')
                            }
                            console.log(err)})
                        // Resetting form for next cycle
                        actions.setSubmitting(false);
                    }}
                >
                    {
                        props => {
                            return(
                                <Form id="employeeSearchForm" onSubmit={props.handleSubmit}>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>{`${junkUserProps.title} ID`}</Form.Label>
                                            <Form.Control
                                                name="junkUserId"
                                                id="junkUserId"
                                                type="number"
                                                placeholder={`${junkUserProps.title} ID - 00001`}
                                                value={props.values.junkUserId}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label>{`${junkUserProps.title} Email`}</Form.Label>
                                            <Form.Control
                                                name="junkUserEmailId"
                                                id="junkUserEmailId"
                                                type="text"
                                                placeholder={junkUserProps.title==="Customer" ? "CustomerName@gmail.com" :"employeename@junkyard.com"}
                                                value={props.values.junkUserEmailId}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>{`${junkUserProps.title} LastName`}</Form.Label>
                                            <Form.Control
                                                name="junkUserLastName"
                                                id="junkUserLastName"
                                                type="text"
                                                placeholder={`Enter ${junkUserProps.title} last name.`}
                                                value={props.values.junkUserLastName}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label>{`${junkUserProps.title} FirstName`}</Form.Label>
                                            <Form.Control
                                                name="junkUserFirstName"
                                                id="junkUserFirstName"
                                                type="text"
                                                placeholder={`Enter ${junkUserProps.title} first name`}
                                                value={props.values.junkUserFirstName}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>{`${junkUserProps.title} Mobile Number`}</Form.Label>
                                            <Form.Control
                                                name="junkUserMobileNumber"
                                                id="junkUserMobileNumber"
                                                type="text"
                                                placeholder={`Enter ${junkUserProps.title} Mobile Number`}
                                                value={props.values.junkUserMobileNumber}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label>{`${junkUserProps.title} Age`}</Form.Label>
                                            <Form.Control
                                                name="junkuserAge"
                                                id="junkuserAge"
                                                type="text"
                                                placeholder={`Enter ${junkUserProps.title} age`}
                                                value={props.values.junkUserMobileNumber}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label>{`${junkUserProps.title} Gender`}</Form.Label>
                                            <Form.Control
                                                as="select"
                                                name="junkUserGender"
                                                id="junkUserGender"
                                                type="text"
                                                placeholder={`Enter ${junkUserProps.title} Gender`}
                                                value={props.values.junkUserGender}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            >
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                                <option value="not_to_specify">Not to specify</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Form.Row>
                                    <Button  size="md" style={{backgroundColor:"#0A62D0"}} onClick={props.handleReset}>Reset Fields</Button>
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

JunkUserSearch.propTypes = {
    updateJunkUserResultsHandler:PropTypes.func,
    junkUserSearchFormInitialValues:PropTypes.object,
    customLoaderHandler:PropTypes.func

}

export default JunkUserSearch
