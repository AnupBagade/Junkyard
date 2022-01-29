import axios from 'axios';
import refreshToken from '../../../TokenManagement/RefreshToken';


const CARTORDERSCONFIG = {
    baseURL:'http://localhost:8080/api/',
    withCredentials: true,
    headers:{
        'content-type':'application/json',
        'accept': 'application/json'
    }
}

const cartManager = async ({junkuserId, itemName='', itemQuantity=0, itemPrice=0, actionType="add"}) => {
    // creating cartItemData object.
    let cartItemData = {
        'item_name': itemName,
        'quantity': itemQuantity,
        'price': itemPrice
    }
    // creating axios instance to interact with cartorders API.
    const axiosCartInstance = axios.create(CARTORDERSCONFIG);

    // creating interceptors to handle 403.
    axiosCartInstance.interceptors.response.use(
        response => { return response },
        async (error) => {
            if(error.response.status === 403){
                const refreshStatus = await refreshToken()
                if(refreshStatus.status === 'success'){
                    return axios.request(error.config)
                }else if(refreshStatus.status === 'failed'){
                    window.location.href='/login'
                }
            }
            return Promise.reject(error)
        }
    )

    // Adding/Removing/Updating cartItems based on the existence of cart instance.
    let result = {}
    await axiosCartInstance.get(`cartorders/${junkuserId}/`)
    .then(async (resp) => {
        // Adding cartItems by creating new CartOrders instance.
        if (resp.data.results?.length === 0){
            result = await axiosCartInstance.post(`cartorders/${junkuserId}/`, {'cart_user':junkuserId, 'cart_items_details':[cartItemData]})
            .then(resp => {return {status: 'success', data: resp.data}})
            .catch(err => {return{status: 'failed', data: err.response}})
        }else{
            // Removing cartItems.
            if(actionType === 'remove'){
                const cartItems = cartItemData['item_name']
                console.log(cartItemData)
                result = await axiosCartInstance.put(`cartorders/${junkuserId}/`,{'cart_user': junkuserId, 'cart_items': [cartItems], 'action_type':actionType})
                .then(resp => {return {status: 'success', data: resp.data}})
                .catch(err => {return{status: 'failed', data: err.response}})
            }else{
                // Adding or Updating cartItems to existing cartOrdes instance based on actionType.
                result = await axiosCartInstance.put(
                    `cartorders/${junkuserId}/`,
                    {'cart_user':junkuserId, 'cart_items_details':[cartItemData], 'action_type': actionType}
                )
                .then(resp => {return {status: 'success', data: resp.data}})
                .catch(err => {return {status: 'failed', data: err.response}})
            }

        }
    })
    .catch(err => {
        result = {status: 'failed', data: err.response}
    })

    return result
}

export default cartManager;
