import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button, Row, Col} from 'react-bootstrap';
import PropTypes from 'prop-types';
import CustomLoader from '../../../CustomLoader/CustomLoader';
import JunkUserDetailsUpdate from './JunkUserDetailsUpdate/JunkUserDetailsUpdate';
import refreshToken from '../../../../TokenManagement/RefreshToken';

const GETJUNKUSERDETAILS = {
    baseURL:'http://localhost:8080/api/',
    withCredentials: true,
    headers:{
        'Content-Type':'application/json',
        'Accept': 'application/json'
    }
}

const JUNKUSERDETAILENDPOINT = 'junkusers/'

const JUNKUSERFIELDSFE = {
    'junkuser_id': 'junkUserId',
    'junkuser_last_name': 'junkUserLastName',
    'junkuser_first_name': 'junkUserFirstName',
    'email': 'junkUserEmailId',
    'junkuser_mobile_number': 'junkUserMobileNumber',
    'junkuser_age': 'junkUserAge',
    'junkuser_gender': 'junkUserGender',
    'junkuser_address': 'junkUserAddress',
    'junkuser_joined': 'junkUserJoined'
}

const defaultJunkUserDetails = {
    'junkUserId':'',
    'junkUserLastName': '',
    'junkUserFirstName': '',
    'junkUserEmailId': '',
    'junkUserMobileNumber': '',
    'junkUserAge': '',
    'junkUserAddress': '',
    'junkUserJoined':''
}

const formatJunkUserDetails = (detailsObj) => {
    let temp = Object();
    Object.keys(detailsObj).map(key => {
        if(JUNKUSERFIELDSFE[key]){
            temp[JUNKUSERFIELDSFE[key]] = detailsObj[key]
        }
    })

    return temp;
}


let axiosRequestController = null;

const JunkUserDetail = (junkUserProps) => {
    const [junkUserDetails, setJunkUserDetails] = useState(defaultJunkUserDetails)
    const [loadingStatus, setLoadingStatus] = useState(false)
    const [updateRequestMessage, setUpdateRequestMessage] = useState({message:'', color:'green'})

    const getJunkUserDetails = async (junkUserId) => {
        if(axiosRequestController){
            axiosRequestController.cancel()
        }
        axiosRequestController = axios.CancelToken.source();

        const axiosJunkUserDetail = axios.create(GETJUNKUSERDETAILS);

        axiosJunkUserDetail.interceptors.response.use(
            (response) => {return response},
            async (error) => {
                if(error.response.status === 403){
                    const refreshStatus = await refreshToken();
                    if(refreshStatus.status === 'success'){
                        return axios.request(error.config);
                    }else if(refreshStatus.Status === 'failed'){
                        return (<Redirect path={{pathname:'/login'}}/>)
                    }
                }
                return Promise.reject(error);
            }
        )

        await axiosJunkUserDetail.get(`${JUNKUSERDETAILENDPOINT}${junkUserId}/`, {cancelToken:axiosRequestController.token})
        .then(resp => {
            console.log(resp.data)
            setJunkUserDetails(() => {
                return formatJunkUserDetails(resp.data)
            })
            axiosRequestController = null;

        })
        .catch(err => {console.log(err)})
    }

    const updateJunkUserDetails = async(junkUserObj, junkUserId) => {
        if(axiosRequestController){
            axiosRequestController.cancel()
        }
        axiosRequestController = axios.CancelToken.source()

        const axiosjunkUserDetail = axios.create(GETJUNKUSERDETAILS);

        axiosjunkUserDetail.interceptors.response.use(
            (response) => {return response},
            async (error) => {
                if(error.response.status === 403){
                    const refreshStatus = await refreshToken();
                    if(refreshStatus.status === 'success'){
                        return axios.request(error.config);
                    }else if(refreshStatus.Status === 'failed'){
                        return (<Redirect path={{pathname:'/login'}}/>)
                    }
                }
                return Promise.reject(error);
            }
        )

        await axiosjunkUserDetail.put(`${JUNKUSERDETAILENDPOINT}${junkUserId}/`, junkUserObj, {cancelToken:axiosRequestController.token})
        .then(resp => {
            setUpdateRequestMessage(() => {return {message:`${junkUserProps.userType} details have been updated`, color:'green'}})
            axiosRequestController = null;
        })
        .catch(err => {
            setUpdateRequestMessage(() => {return{message:`Unable to update ${junkUserProps.userType} details`, color:'red'}})
        })
    }

    useEffect(() => {
        getJunkUserDetails(junkUserProps.junkUserId)
    }, [junkUserProps.junkUserId])
    return(
        <Modal {...junkUserProps} size="lg" aria-labelledby="contained-modal-title-vcenter" centered style={{paddingTop:"15%"}}>
            {
                loadingStatus ?
                (<Row style={{display: 'flex', justifyContent: 'center'}}>
                    <CustomLoader />
                </Row>) :
                (<div>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                          User Details
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <JunkUserDetailsUpdate
                            initialValues={junkUserDetails}
                            updateJunkUserDetails={updateJunkUserDetails}
                            requestInfo={updateRequestMessage}
                            userType={junkUserProps.userType}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Row as={Col}>
                            {updateRequestMessage.message && (<h6 style={{color:`${updateRequestMessage.color}`}}>{updateRequestMessage.message}</h6>)}
                        </Row>
                        <Button onClick={() => junkUserProps.onHide(false)} variant="danger">Close</Button>
                    </Modal.Footer>
                </div>)
            }
        </Modal>

    )
}

JunkUserDetail.propTypes = {
    show:PropTypes.bool,
    onHide:PropTypes.func,
    employeeid:PropTypes.number,
    userType:PropTypes.string
}

export default JunkUserDetail;
