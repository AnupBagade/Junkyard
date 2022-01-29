import React, { Component, useContext, useState} from 'react';
import CartTable from './CartTable/CartTable';
import Address from './Address/Address';
import CartQuantityModal from './CartModal/CartQuantityModal';
import PlaceOrderButton from './PlaceOrderButton/PlaceOrderButton';
import CartStyle from './CartManagement.module.css';
import { Container, InputGroup, FormControl, Button, Row } from 'react-bootstrap';
import CartDataContext from '../../Context/CartDataContext/CartDataContext';
import CartDataProvider from '../../Provider/CartDataProvider/CartDataProvider';
import Auxiliary from '../../Auxiliary/Auxiliary';
import Failure from '../Alert/Failure/Failure';
import CustomLoader from '../CustomLoader/CustomLoader';
import refreshToken from '../../TokenManagement/RefreshToken';
import axios from 'axios';
import cartManager from './CartManager/CartManager';
import lodash from 'lodash';
import Confirmation from '../Alert/Confirmation/Confirmation';
import Success from '../Alert/Success/Success';

const CARTORDERSCONFIG = {
    baseURL:'http://localhost:8080/api/',
    withCredentials: true,
    headers:{
        'content-type':'application/json',
        'accept': 'application/json'
    }
}

const PENDINGORDERSCONFIG = {
    baseURL:'http://localhost:8080/api/',
    withCredentials: true,
    headers:{
        'content-type': 'application/json',
        'accept': 'application/json'
    }
}

const ITEMSCONFIG = {
    baseURL:'http://localhost:8080/api/',
    withCredentials: true,
    headers:{
        'content-type': 'application/json',
        'accept': 'application/json'
    }
}

const junkuserId = 1

class CartManagement extends Component{

    constructor(props){
        super(props)
        this.state = {
            showCartQuantityModal: false,
            quantityModalData:{},
            cartItemsData : {},
            cartLoadingStatus : false,
            uploadingOrderStatus : false,
            showConfirm : false,
            ShowOrderPlacedSuccess: false,
            orderDeliveryAddress : '',
            orderMobileNumber: ''
        }
    }

    loadCartQuantityModal = (status, itemName, itemQuantity, itemPrice) =>{
        this.setState(prevState => {
            return{
                ...prevState,
                ['showCartQuantityModal'] : status,
                ['quantityModalData'] : {item_name:itemName, quantity:itemQuantity, price:itemPrice}
            }
        })
    }

    hideCartQuantityModal = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                ['showCartQuantityModal']: false
            }
        })
    }

    deleteCartItem = async (itemName) => {
        const deleteItemStatus = await cartManager({junkuserId:junkuserId, itemName:itemName, actionType:"remove"});
        if(deleteItemStatus.status === "success"){
            this.setState(prevState => {
                return{
                    ...prevState,
                    ['cartItemsData'] : deleteItemStatus.data
                }
            })
        }else{
            console.log(deleteItemStatus.status)
            console.log(deleteItemStatus.data)
        }
    }

    updateCartItem = async (itemName, itemQuantity, itemPrice) => {
        const updateItemStatus = await cartManager({junkuserId:junkuserId, itemName:itemName, itemQuantity:itemQuantity, itemPrice:itemPrice, actionType:"update"})
        // Updating state with new cartItems data.
        if(updateItemStatus.status === 'success'){
            this.setState(prevState => {
                return{
                    ...prevState,
                    ['cartItemsData'] : updateItemStatus.data
                }
            })
        }else{
            console.log(updateItemStatus.data)
        }
    }

    getCartItemsData = async () => {

        // Creating axios isntance.
        const axiosCartInstance = axios.create(CARTORDERSCONFIG);

        // Creating interceptors to handle 403.
        axiosCartInstance.interceptors.response.use(
            response => {return response},
            async (error) => {
                if(error.response.status === 403){
                    const refreshStatus = await refreshToken();
                    console.log(`Inside refreshToken of getCartItemsData in cartManagement - ${refreshStatus}`)
                    console.log(refreshStatus)
                    if(refreshStatus.status === 'success'){
                        return axios.request(error.config)
                    }else if(refreshStatus.status === 'failed'){
                        window.location.href ='/login';
                    }
                }
                return Promise.reject(error)
            }
        )

        // Get cartItems data from cartorders endpoint.
        axiosCartInstance.get(`cartorders/${junkuserId}/`)
        .then(resp => {
            this.setState(prevState => {
                return{
                    ...prevState,
                    ['cartItemsData'] : resp.data,
                    ['loadingStatus'] : false

                }
            })
        })
        .catch(err => {})
    }

    validateItemsPrice = async (cartItemsDetails, address, mobileNumber) => {
        // Modify value to True if there are any changes in the price.
        let priceModified = false

        // create axios isntance using ITEMSCONFIG.
        const axiosItems = axios.create(ITEMSCONFIG);

        // create interceptors to retry axios request if request fails to authenticate.
        axiosItems.interceptors.response.use(
            response => {
                const itemsPrice = Object()
                response.data.results.map( item => {
                    itemsPrice[item['item_name_key']] = item['item_price']
                })
                itemsPrice['FLAMINGHOSTBURGER'] = 100
                response.data['itemsPriceList'] = itemsPrice
                return response
            },
            async (error) => {
                if(error.response.status === 403){
                    const refreshStatus = await refreshToken();
                    if(refreshStatus.status === 'success'){
                        return axios.request(error.config)
                    }else if(refreshStatus.status === 'failed'){
                        window.location.href = '/login';
                    }
                }
                return Promise.reject(error)
            }
        )

        // Get request to items endpoint.
        const priceValidation = await axiosItems.get('items/', {params:{'items': "CHICKENYARDBURGER,DOUBLETAPBURGER,FLAMINGHOSTBURGER"}})
        .then(resp => {
            cartItemsDetails.cart_items_keys.map(itemKey => {
                if(resp.data.itemsPriceList[itemKey] !== cartItemsDetails.cart_items_details[itemKey].price){
                    cartItemsDetails.cart_items_details[itemKey].price = resp.data.itemsPriceList[itemKey]
                    priceModified = true
                }
            })
            if(priceModified){
                this.setState(prevState => {
                    return{
                        ...prevState,
                        ['cartItemsData'] : cartItemsDetails,
                        ['showConfirm'] : true,
                        ['orderDeliveryAddress'] : address,
                        ['orderMobileNumber'] : mobileNumber

                    }
                })
            }else{
                this.setState(prevState => {
                    return{
                        ...prevState,
                        ['orderDeliveryAddress'] : address,
                        ['orderMobileNumber'] : mobileNumber
                    }
                })
            }
            return {priceModified : priceModified}
        })
        .catch(err => {console.log(err)})

        return priceValidation
    }

    uploadOrderDetails = async (cartItemsData) => {
        // Hiding confirm window, if exists. Updating loadingStatus to true.
        this.setState(prevState => {
            return{
                ...prevState,
                ['showConfirm'] : false,
                ['loadingStatus'] : true
            }
        })

        // formatting orderDetails into required format.
        let orderDetails = {
            order_item_details : Object(),
            order_item_keys:Array(),
            order_total_price: 0.0

        }
        orderDetails.order_item_details = lodash.cloneDeep(cartItemsData.cart_items_details)
        orderDetails.order_item_keys = lodash.cloneDeep(cartItemsData.cart_items_keys)
        orderDetails.order_total_price = cartItemsData.cart_items_total_price

        // creating axios instance with PENDINGORDERSCONFIG.
        const axiosPendingOrders = axios.create(PENDINGORDERSCONFIG);

        // creating interceptor to refresh token if request fails to authenticate.
        axiosPendingOrders.interceptors.response.use(
            response => {return response},
            async (error) => {
                if(error.response.status === 403){
                    const refreshStatus = await refreshToken();
                    if(refreshStatus.status === 'success'){
                        return axios.request(error.config)
                    }else if(refreshStatus.status === 'failed'){
                        window.location.href = '/login'
                    }
                }
                return Promise.reject(error)
            }
        )

        // POST request to pending orders end-point.
        await axiosPendingOrders.post(
            'pendingorders/',
            {
                user: junkuserId,
                order_items: orderDetails,
                order_delivery_address:this.state.orderDeliveryAddress,
                order_user_mobile_number: this.state.orderMobileNumber
            }
        )
        .then(resp => {
            console.log(resp.data)
            this.setState(prevState => {
                return {
                    ...prevState,
                    ['loadingStatus'] : false,
                    ['cartItemsData'] : Object(),
                    ['ShowOrderPlacedSuccess'] : true
                }
            })
        })
        .catch(err => {
            console.log(err.response)

            this.setState(prevState => {
                return {
                    ...prevState,
                    ['loadingStatus'] : false
                }
            })
        })
    }

    placeOrder = async ({address, mobileNumber}) => {
        // Validate items price. If yes continue else cancel the request.
        const cartData = lodash.cloneDeep(this.state.cartItemsData)
        let priceModified = await this.validateItemsPrice(cartData, address, mobileNumber)
        if(!priceModified.priceModified){
            await this.uploadOrderDetails(this.state.cartItemsData)
        }
    }

    uploadOrderDetailsOnConfirm = () => {
        this.uploadOrderDetails(this.state.cartItemsData)
    }

    cancelUploadOrderDetails = () => {
        this.setState(prevState => {
            return {
                ['showConfirm'] : false
            }
        })
    }

    componentDidMount(){
        this.setState(prevState => {return {...prevState, ['loadingStatus']: true}})
        this.getCartItemsData()
    }

    render(){
        return(
            <Container>
                {
                    this.state.ShowOrderPlacedSuccess &&
                    (
                        <Success
                            show={this.state.ShowOrderPlacedSuccess}
                            title="Order placed."
                            btnText="Ok"
                            message="Thank you for being a food junky!!!!."
                        />
                    )
                }
                {
                    this.state.showCartQuantityModal &&
                    (
                        <CartQuantityModal
                            show={this.state.showCartQuantityModal}
                            itemDetails={this.state.quantityModalData}
                            onHide={this.hideCartQuantityModal}
                            updateQuantity={this.updateCartItem}
                            loadCartItems={this.getCartItemsData}
                        />
                    )
                }
                {
                    this.state.loadingStatus ?
                    (<Row style={{display: 'flex', justifyContent: 'center', paddingTop: "40%", paddingBottom:"40%"}}>
                        <CustomLoader />
                    </Row>) :
                    (
                        <Auxiliary>
                            <CartTable
                            quantityModal={this.loadCartQuantityModal}
                            cartItemsData={this.state.cartItemsData}
                            deleteCartItem={this.deleteCartItem}
                            />
                            <Address placeOrder={this.placeOrder}/>
                        </Auxiliary>
                    )
                }
                {
                    this.state.showConfirm &&
                    (<Confirmation
                        title="Items price modified."
                        btnText="Continue"
                        btnStyle="success"
                        message="There will be changes in total price. Please confirm"
                        onConfirm={this.uploadOrderDetailsOnConfirm}
                        onCancel={this.cancelUploadOrderDetails}
                    />)
                }
            </Container>
        )
    }

}

export default CartManagement;
