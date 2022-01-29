import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import {Container, Button, Row} from 'react-bootstrap';
import OrderSearch from './OrderSearch/OrderSearch';
import UpdateOrderTable from './UpdateOrder/UpdateOrderTable';
import CustomAPINextPreviousButton from '../../customAPINextPreviousButton/customAPINextPreviousButton';
import CustomLoader from '../../CustomLoader/CustomLoader';
import Confirmation from '../../Alert/Confirmation/Confirmation';
import Success from '../../Alert/Success/Success';
import refreshToken from '../../../TokenManagement/RefreshToken';

const ORDERSCONFIG = {
    baseURL:'http://localhost:8080/api/',
    withCredentials: true,
    headers:{
        'content-type':'application/json',
        'accept': 'application/json'
    }
}

const AXIOSGETORDERSLIST = {
    baseURL:'http://localhost:8080/api/',
    withCredentials: true,
    headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}

const PENDINGORDERAPIENDPOINT = 'pendingorders/'

const APPROVEDORDERAPIENDPOINT = 'approvedorders/'

const PENDINGORDERSTATUS = 'pending'

const APPROVEDORDERSTATUS = 'approved'

const junkuserId = 4

let axiosRequestController = null

class OrderManagement extends Component{

    constructor(props){
        super(props)
        this.state = {
            orderSearchFormInitialValues:{
                orderId: 0,
                itemType:'',
                itemName:'',
                userMobileNumber:'',
                userEmailId:'',
                orderStatus:'',
                orderSubStatus:'',
                orderApprovedEmployee:'',
                orderDeliveryEmployee:''
            },
            orderSearchResults : [],
            orderSearchResultsNext:'',
            orderSearchResultsPrevious:'',
            loading: false,
            showApproveConfirm: false,
            showSuccess: false,
            pendingOrderId:0,
            showCancelConfirm: false
        }
    }

    customLoaderHandler = (status) => {
        this.setState((prevState) => {
            return{
                ...prevState,
                ['loading'] : status
            }
        })
    }

    updateOrderSearchResults = (orders) => {
        this.setState((prevState) => {
            console.log(orders)
            return{
                ...prevState,
                ['orderSearchResults']: orders.results,
                ['orderSearchResultsNext'] : orders.next,
                ['orderSearchResultsPrevious']: orders.previous,
                ['loading']: false
            }
        })
    }

    getConsecutiveOrderResults = async (url) => {
        this.customLoaderHandler(true)
        await axios.get(url).then((orders) => {
            this.setState((prevState) => {
                return{
                    ...prevState,
                    ['orderSearchResults'] : orders.data.results,
                    ['orderSearchResultsNext'] : orders.data.next,
                    ['orderSearchResultsPrevious'] : orders.data.previous,
                    ['loading']: false
                }
            })
        })
    }

    getOrders = async ({orderStatus, axiosParams}) => {
        if(axiosRequestController){
            axiosRequestController.cancel()
        }

        axiosRequestController = axios.CancelToken.source()

        const axiosGetOrders = axios.create(ORDERSCONFIG);

        // Interceptors to retry request, if token expired.
        axiosGetOrders.interceptors.response.use(
            response => {return response},
            async error => {
                if(error.response.status == 403){
                    const refreshStatus = await refreshToken();
                    if(refreshStatus.status == 'success'){
                        return axios.request(error.config)
                    }else if(refreshStatus.status == 'failed'){
                        return (<Redirect to={{pathname:'/login'}} />)
                    }
                }
                return Promise.reject(error)
            }
        )

        // Depending on the value of order status, make a call to specific URL.
        if(orderStatus === APPROVEDORDERSTATUS){
            await axiosGetOrders(APPROVEDORDERAPIENDPOINT, {params:{...axiosParams}, cancelToken:axiosRequestController.token})
            .then(resp =>{
                this.updateOrderSearchResults(resp.data)
                axiosRequestController = null
            })
            .catch(err=>{
                if(axios.isCancel(err)){
                    console.log('Request cancelled')
                }
                console.error(err)})
        }else{
            await axiosGetOrders.get(PENDINGORDERAPIENDPOINT, {params:{...axiosParams}, cancelToken:axiosRequestController.token})
            .then(resp => {
                console.log(resp)
                this.updateOrderSearchResults(resp.data)
                axiosRequestController = null
            }).catch(err => {
                if(axios.isCancel(err)){
                    console.log('Request cancelled')
                }
                console.error(err)
            })
        }
    }

    onConfirmApprovingOrder = async () => {
        // Updating loadingStatus to display loading UI.
        this.setState(prevState => {
            return {
                ...prevState,
                ['showApproveConfirm'] : false,
                ['loadingStatus'] : true
            }
        })

        // creating axios instance using ORDERSCONFIG.
        const axiosApproveOrders = axios.create(ORDERSCONFIG);

        // creating interceptors to handle authentication.
        axiosApproveOrders.interceptors.response.use(
            response => {return response},
            async (error) => {
                if(error.response.status === 403){
                    const refreshStatus = await refreshToken();
                    if(refreshStatus.status === 'success'){
                        return axios.request(error.config)
                    }else{
                        window.location.href='/login'
                    }
                }
                return Promise.reject(error)
            }
        )

        // Making post request to apporve orders endpoint.
        const approveOrder = await axiosApproveOrders.post('approvedorders/', {order_id: this.state.pendingOrderId, employee_id:junkuserId})
        .then(resp => {
            if(resp.status === 201){
                this.setState(prevState => {
                    return {
                        ...prevState,
                        ['pendingOrderId'] : 0,
                        ['loading'] : false,
                        ['showSuccess'] : true
                    }
                })
            }
            console.log('updated')
        })
        .catch(err => {console.log(err.response)})

        await this.getOrders({orderStatus:"pending", axiosParams: Object()})
    }

    onConfirmCancellingOrder = async() => {
        // Updating loadingStatus to display loading UI.
        this.setState(prevState => {
            return {
                ...prevState,
                ['showCancelConfirm'] : false,
                ['loadingStatus'] : true
            }
        })

        // creating axios instance using ORDERSCONFIG.
        const axiosApproveOrders = axios.create(ORDERSCONFIG);

        // creating interceptors to handle authentication.
        axiosApproveOrders.interceptors.response.use(
            response => {return response},
            async (error) => {
                if(error.response.status === 403){
                    const refreshStatus = await refreshToken();
                    if(refreshStatus.status === 'success'){
                        return axios.request(error.config)
                    }else{
                        window.location.href='/login'
                    }
                }
                return Promise.reject(error)
            }
        )

        // Making post request to apporve orders endpoint.
        const deleteOrder = await axiosApproveOrders.delete(`pendingorders/${this.state.pendingOrderId}/`)
        .then(resp => {
            this.setState(prevState => {
                return {
                    ...prevState,
                    ['pendingOrderId'] : 0,
                    ['showSuccess'] : true
                }
            })
        })
        .catch(err => {console.log(err.response)})
        await this.getOrders({orderStatus:"pending", axiosParams: Object()})
    }

    onCancelConfirmWindow = (action) => {
        if(action === 'approve'){
            this.setState(prevState => {
                return {
                    ...prevState,
                    ['showApproveConfirm'] : false
                }
            })
        }else if(action === 'cancel'){
            this.setState(prevState => {
                return {
                    ...prevState,
                    ['showCancelConfirm'] : false
                }
            })
        }
    }

    processPendingOrder = (action, orderId) => {
        if(action==='approve'){
            this.setState(prevState => {
                return {
                    ...prevState,
                    ['showApproveConfirm'] : true,
                    ['pendingOrderId'] : orderId
                }
            })
        }else if(action === 'cancel'){
            this.setState(prevState => {
                return {
                    ...prevState,
                    ['showCancelConfirm'] : true,
                    ['pendingOrderId'] : orderId
                }
            })
        }

    }


    render(){
        return(
            <Container style={{paddingTop:"5%", paddingBottom:"5%"}}>
                <OrderSearch
                    orderSearchFormInitialValues={this.state.orderSearchFormInitialValues}
                    updateOrderResultsHandler={this.updateOrderSearchResults}
                    customLoaderHandler={this.customLoaderHandler}
                    getOrders={this.getOrders}/>
                <Row style={{display: 'flex', justifyContent: 'center'}}>
                  {this.state.loading && (<CustomLoader />)}
                </Row>
                {
                    this.state.showApproveConfirm &&
                    (<Confirmation
                        title="Approve order."
                        btnText="Continue"
                        btnStyle="success"
                        message="Once order is approved, it can not be retrieved."
                        onConfirm={() => {this.onConfirmApprovingOrder()}}
                        onCancel={() => {this.onCancelConfirmWindow("pending")}}
                    />)
                }
                {
                    this.state.showCancelConfirm &&
                    (<Confirmation
                        title="Cancel order."
                        btnText="Continue"
                        btnStyle="danger"
                        message="Order will be cancelled permanently."
                        onConfirm={() => {this.onConfirmCancellingOrder()}}
                        onCancel={() => {this.onCancelConfirmWindow("cancel")}}
                    />)
                }
                {
                    this.state.showSuccess &&
                    (
                        <Success
                            show={this.state.showSuccess}
                            title="Order Approved."
                            btnText="Ok"
                            message="Order has been approved."
                        />
                    )
                }
                <CustomAPINextPreviousButton
                    previousResultsLink={this.state.orderSearchResultsPrevious}
                    nextResultsLink={this.state.orderSearchResultsNext}
                    getResultsHandler={this.getConsecutiveOrderResults} />
                <UpdateOrderTable
                    orderSearchResults={this.state.orderSearchResults}
                    processPendingOrder={this.processPendingOrder}
                />
            </Container>

        )
    }
}

export default OrderManagement;
