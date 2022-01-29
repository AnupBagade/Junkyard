import React from 'react';
import {Formik} from 'formik';
import {Form, Col, Button} from 'react-bootstrap';
import * as Yup from 'yup';
import PropTypes from 'prop-types';


const JUNKUSERFIELDSBE = {
    'junkUserId': 'junkuser_id',
    'junkUserLastName': 'junkuser_last_name',
    'junkUserFirstName': 'junkuser_first_name',
    'junkUserEmailId': 'email',
    'junkUserMobileNumber': 'junkuser_mobile_number',
    'junkUserAge': 'junkuser_age',
    'junkUserGender': 'junkuser_gender',
    'junkUserAddress': 'junkuser_address',
    'junkUserJoined': 'junkuser_joined'
}

const JunkUserDetailsUpdate = (junkUserDetails) => {

    const junkUserDetailsValidation = Yup.object().shape({
        junkUserLastName : Yup.string().required('Please provide employee LastName'),
        junkUserFirstName : Yup.string().required('Please provide employee FirstName'),
        junkUserEmailId : Yup.string().required('Please provide employee email id.'),
        junkUserMobileNumber : Yup.string().matches(/^[\d]{10}$/, 'Please provide valid 10 digit mobile number.')
        .required('Please provide valid mobile number.'),
        junkUserGender : Yup.string().required('Please select employee gender.'),
        junkUserAge : Yup.number().moreThan(17, 'Employee age should be minimum 18.'),
        junkUserAddress : Yup.string().required('Please provide employee address.')

    })

    const formatJunkUserDetailsObject = (newValues, initialValues) => {
        let formData = new FormData();
        Object.keys(newValues).map(field => {
            if(newValues[field] !== initialValues[field]){
                formData.append(JUNKUSERFIELDSBE[field], newValues[field])
            }
        })

        return formData
    }

    return(
        <Formik
            enableReinitialize
            validationSchema={junkUserDetailsValidation}
            initialValues={junkUserDetails.initialValues}
            onSubmit={(values, actions) => {
                const junkUserModifiedData = formatJunkUserDetailsObject(values, junkUserDetails.initialValues)
                junkUserDetails.updateJunkUserDetails(junkUserModifiedData, values.junkUserId)
                actions.setSubmitting(false)
            }}
        >
            {(props) => {
                return(
                    <Form id="junkUserDetailsUpdate" onSubmit={props.handleSubmit}>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>{`${junkUserDetails.userType} ID`}</Form.Label>
                                <Form.Control
                                    readOnly
                                    id="junkUserId"
                                    type="text"
                                    value={props.values.junkUserId}
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>{`${junkUserDetails.userType} Email`}</Form.Label>
                                <Form.Control
                                    id="junkUserEmailId"
                                    type="text"
                                    placeholder="employeeName@junkyard.com"
                                    name="junkUserEmailId"
                                    onChange={props.handleChange}
                                    value={props.values.junkUserEmailId}
                                    onBlur={props.handleBlur}
                                />
                                {props.errors.junkUserEmailId && props.touched.junkUserEmailId ? (<div style={{color:"red"}}>{props.errors.junkUserEmailId}</div>) : null}
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>{`${junkUserDetails.userType} LastName`}</Form.Label>
                                <Form.Control
                                    id="junkUserLastName"
                                    type="text"
                                    placeholder="employee lastname"
                                    name="junkUserLastName"
                                    onChange={props.handleChange}
                                    value={props.values.junkUserLastName}
                                    onBlur={props.handleBlur}
                                />
                                {props.errors.junkUserLastName && props.touched.junkUserLastName ? (<div style={{color:"red"}}>{props.errors.junkUserLastName}</div>) : null}
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>{`${junkUserDetails.userType} FirstName`}</Form.Label>
                                <Form.Control
                                    id="junkUserFirstName"
                                    type="text"
                                    placeholder="employee firstname"
                                    name="junkUserFirstName"
                                    onChange={props.handleChange}
                                    value={props.values.junkUserFirstName}
                                    onBlur={props.handleBlur}
                                />
                                {props.errors.junkUserFirstName && props.touched.junkUserFirstName ? (<div style={{color:"red"}}>{props.errors.junkUserFirstName}</div>) : null}
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>{`${junkUserDetails.userType} Mobile Number`}</Form.Label>
                                <Form.Control
                                    id="junkUserMobileNumber"
                                    type="text"
                                    placeholder="employee mobile number"
                                    name="junkUserMobileNumber"
                                    onChange={props.handleChange}
                                    value={props.values.junkUserMobileNumber}
                                    onBlur={props.handleBlur}
                                />
                                {props.errors.junkUserMobileNumber && props.touched.junkUserMobileNumber ? (<div style={{color:"red"}}>{props.errors.junkUserMobileNumber}</div>) : null}
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>{`${junkUserDetails.userType} Gender`}</Form.Label>
                                <Form.Control
                                    as="select"
                                    id="junkUserGender"
                                    name="junkUserGender"
                                    type="text"
                                    placeholder="Select gender"
                                    value={props.values.junkUserGender}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                    <option value="not_to_specify">Not to specify</option>
                                </Form.Control>
                                {props.errors.junkUserGender && props.touched.junkUserGender ? (<div style={{color:"red"}}>{props.errors.junkUserGender}</div>) : null}
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>{`${junkUserDetails.userType} Age`}</Form.Label>
                                <Form.Control
                                    id="junkUserAge"
                                    type="text"
                                    placeholder="employee age"
                                    name="junkUserAge"
                                    onChange={props.handleChange}
                                    value={props.values.junkUserAge}
                                    onBlur={props.handleBlur}
                                />
                                {props.errors.junkUserAge && props.touched.junkUserAge ? (<div style={{color:"red"}}>{props.errors.junkUserAge}</div>) : null}
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>{`${junkUserDetails.userType} Address`}</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    id="junkUserAddress"
                                    type="text"
                                    placeholder="employee gender"
                                    name="junkUserAddress"
                                    onChange={props.handleChange}
                                    value={props.values.junkUserAddress}
                                    onBlur={props.handleBlur}
                                />
                                {props.errors.junkUserAddress && props.touched.junkUserAddress ? (<div style={{color:"red"}}>{props.errors.junkUserAddress}</div>) : null}
                            </Form.Group>
                        </Form.Row>
                        <Button  size="md" style={{backgroundColor:"#0A62D0"}} onClick={props.handleReset}>Reset Fields</Button>
                        <Button type="submit" variant="success" size="md" style={{float:"right"}} disabled={Object.keys(props.touched).length ? false : true}>Submit</Button>
                    </Form>
                )
            }}
        </Formik>
    )
}


JunkUserDetailsUpdate.propTypes = {
    initialValues : PropTypes.object,
    updateJunkUserDetails: PropTypes.func,
    userType:PropTypes.string
}

export default JunkUserDetailsUpdate;
