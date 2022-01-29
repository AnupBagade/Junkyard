import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Container, Row, Button} from 'react-bootstrap';
import CustomLoader from '../../CustomLoader/CustomLoader';
import CustomAPINextPreviousButton from '../../customAPINextPreviousButton/customAPINextPreviousButton';
import JunkUserSearch from './JunkUserSearch/JunkUserSearch';
import UpdateJunkUserTable from './UpdateJunkUserTable/UpdateJunkUserTable';
import AddEmployee from './AddEmployee/AddEmployee';
import JunkUserDetail from './JunkUserDetail/JunkUserDetail';
import ScrollableTabsButtonAuto from '../../../Containers/HorizontalTabs/horizontalTabs';

const AXIOSJUNKUSERCONFIG = {
    withCredentials: true,
    headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}

// create a variable to handle duplicate axios request.
let axiosRequestController = null;

class JunkUserManagement extends Component{
    constructor(props){
        super(props);
        this.state = {
            junkUserFormInitialValues : {
                'junkUserId':'',
                'junkUserLastName':'',
                'junkUserFirstName':'',
                'junkUserEmailId':'',
                'junkUserMobileNumber':'',
                'junkUserAge':'',
                'junkUserGender':''
            },
            junkUserSearchResults:[],
            junkUserSearchResultsNext:'',
            junkUserSearchResultsPrevious:'',
            loadingStatus:false,
            junkUserDetailModalShow:false,
            junkUserDetailsId:''
        }
    }

    customLoaderHandler = (status) => {
        this.setState(prevState => {
            return{
                ...prevState,
                ['loadingStatus'] : status
            }
        })
    }

    junkUserDetailModalHandler = (status) => {
        this.setState(prevState => {
            return{
                ...prevState,
                ['junkUserDetailModalShow'] : status
            }
        })
    }

    updateJunkUserSearchResults = (junkUser) =>{
        this.setState(prevState => {
            return{
                ...prevState,
                ['junkUserSearchResults'] : junkUser.results,
                ['junkUserSearchResultsNext'] : junkUser.next,
                ['junkUserSearchResultsPrevious'] : junkUser.previous,
                ['loadingStatus'] : false
            }
        })
    }

    getConsecutiveJunkUserResults = async (URL) => {

        // Create a interceptor to refresh token, and retry request.
        if(axiosRequestController != null){
            axiosRequestController.cancel()
        }else{
            const axiosJunkUser = axios.create(AXIOSJUNKUSERCONFIG);
            // create canceltoken to cancel duplicate request.
            axiosRequestController = axios.CancelToken.source();

            await axiosJunkUser.get(URL, {cancelToken: axiosRequestController.token})
            .then(resp => {
                this.updateJunkUserSearchResults(resp.data)
                axiosRequestController=null;

            })
            .catch(err => {console.log(err)})
        }
    }



    getJunkUserDetails = (id)  => {
        this.setState((prevState) => {
            return{
                ...prevState,
                ['junkUserDetailModalShow'] : true,
                ['junkUserDetailsId']: id
            }
        })
    }
    render(){
        return(
            <Container style={{paddingTop:"5%", paddingBottom:"5%"}}>
                {this.props.userType==='Employee' && <AddEmployee />}
                <JunkUserSearch
                    junkUserSearchFormInitialValues={this.state.junkUserFormInitialValues}
                    updateJunkUserResultsHandler={this.updateJunkUserSearchResults}
                    customLoaderHandler={this.customLoaderHandler}
                    userType={this.props.searchUserType}
                    title={this.props.userType}/>
                <Row style={{display: 'flex', justifyContent: 'center'}}>
                    {this.state.loading && (<CustomLoader />)}
                </Row>
                { this.state.junkUserDetailModalShow && (<JunkUserDetail
                    show={this.state.junkUserDetailModalShow}
                    onHide={this.junkUserDetailModalHandler}
                    junkUserId={this.state.junkUserDetailsId}
                    userType={this.props.userType}
                    />)}
                <CustomAPINextPreviousButton
                 getResultsHandler={this.getConsecutiveJunkUserResults}
                 previousResultsLink={this.state.junkUserSearchResultsPrevious}
                 nextResultsLink={this.state.junkUserSearchResultsNext}/>
                <UpdateJunkUserTable
                    junkUserSearchResults={this.state.junkUserSearchResults}
                    getJunkUserDetails={this.getJunkUserDetails}
                    userType={this.props.userType}/>
            </Container>
        )
    }
}

JunkUserManagement.propTypes = {
    userType:PropTypes.string,
    searchUserType:PropTypes.string
}

export default JunkUserManagement;
