import React, {useContext, useEffect, useState, useRef} from 'react';
import axios from 'axios';
import refreshToken from '../../TokenManagement/RefreshToken';
import CartDataContext from '../../Context/CartDataContext/CartDataContext';

const CARTORDERSCONFIG = {
    baseURL:'http://localhost:8080/api/',
    withCredentials: true,
    headers:{
        'content-type':'application/json',
        'accept': 'application/json'
    }
}

const ITEMDETAILSCONFIG = {
    baseURL:'http://localhost:8080/api/',
    withCredentials: true,
    headers:{
        'content-type':'application/json',
        'accept': 'application/json'
    }
}

const CartDataProvider = ({children}) => {
    const [cartItemsData, setCartItemsData] = useState({'items_details':[], 'items':[], 'total_price':0});
    const [cartItemsPrice, setCartItemsPrice] = useState({});
    const [cartItems, setCartItems] = useState([]);
    const [cartItemsExist, setCartItemsExist] = useState(false);

    const cartItemsDataRef = useRef();
    cartItemsDataRef.current = cartItemsData
    const cartItemsExistRef = useRef();
    cartItemsExistRef.current = cartItemsExist

    const getCartItemsPrice = async (items) => {
        const axiosgetItemDetails = axios.create(ITEMDETAILSCONFIG)

        axiosgetItemDetails.interceptors.response.use(
            (response) => {
                let price = Object();
                response.data.results.map(item => {
                    price[item.item_name] = item.item_price
                })
                response.data['itemsPrice'] = price
                return response
            },
            async (error) => {
                if (error.response.status == 403){
                    const refreshStatus = await refreshToken()
                    if(refreshStatus == 'success'){
                        return axios.request(error)
                    }else if(refreshStatus == 'failed'){
                        window.location.href='/login'
                    }
                }
                return Promise.reject(error)
            }
        )
        await axiosgetItemDetails.get('items/', {
            params:{
                'items': items.join(',')
            }
        })
        .then(resp => {
            setCartItemsPrice(prevState => resp.data.itemsPrice)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const getCartItemsData = async () => {
        const axiosGetCartItems = axios.create(CARTORDERSCONFIG);

        axiosGetCartItems.interceptors.response.use(
            response => {
                console.log(response)
                // if("cart_items" in response.data){
                //     // response.data['cart_items'] = JSON.parse(response.data['cart_items'].replace(/'/g, '"'))
                //
                // }
                console.log(response)
                return response
            },
            async error => {
                if(error.response.status == 403){
                    const refreshStatus = await refreshToken();
                    if(refreshStatus.status === 'success'){
                        return axios.request(error.config)
                    }else if(refreshStatus.status === 'error'){
                        console.log('refreshing failed')
                        document.location.href='/login'
                    }
                }else{
                    return Promise.reject(error)
                }
            }
        )

        await axiosGetCartItems.get('cartorders/30/')
        .then(resp => {
            if("cart_items" in resp.data){
                setCartItemsData(resp.data['cart_items'])
                setCartItemsExist(true)
                console.log(resp.data)
                console.log(resp.data['cart_items']['items'])
                // setCartItems(resp.data['cart_items']['items'])
                return getCartItemsPrice(resp.data['cart_items']['items'])
            }
        })
        .catch(err => {
            console.log('Request Failed')
            console.log(err)
        })
    }

    const updateCartItemsData = (actionType, itemName, newQuantity=0, price=0) => {
        switch(actionType){
            case 'addNewItem':
                let newItemsDetails = Array()
                let newItems = Array()
                let totalPrice = 0
                setCartItemsData(prevState => {
                    newItemsDetails = [...prevState['items_details'], {item_name: itemName, quantity: newQuantity}]
                    newItems = [...prevState['items'], itemName]
                    totalPrice = parseInt(prevState['total_price']) + (parseInt(newQuantity) * parseInt(price))
                    return{
                        ...prevState,
                        ['items_details'] : newItemsDetails,
                        ['items']:newItems,
                        ['total_price'] : totalPrice
                    }
                })

                setCartItemsPrice(prevState => {
                    return {...prevState, [itemName] : price}
                })
                break;
            case 'updateQuantity':
                console.log('inside updating quantity')
                setCartItemsData(prevState => {
                    let tempCartData = {...prevState}
                    tempCartData['items_details'].map(item => {
                        if(item['item_name'] == itemName){
                            item.quantity = parseInt(item.quantity) + parseInt(newQuantity)
                        }
                    })
                    tempCartData['total_price'] = parseInt(tempCartData['total_price']) + (parseInt(newQuantity) * parseInt(cartItemsPrice[itemName]))
                    return tempCartData
                })
                break;
            case 'updateQuantityFromCart':
                setCartItemsData(prevState => {
                    let tempCartData = {...prevState}
                    tempCartData['items_details'].map(item => {
                        if(item.item_name == itemName){
                            item.quantity = newQuantity
                        }
                    })
                    return tempCartData
                })
                break;
            case 'deleteItem':
                setCartItemsData(prevState => {
                    let tempCartData = {...prevState}
                    tempCartData['items_details'].map((item, index) => {

                        if(item.item_name == itemName){
                            console.log(itemName)
                            tempCartData['items_details'].splice(index, 1)
                            tempCartData['items'].splice(tempCartData['items'].indexOf(itemName), 1)
                        }
                    })
                    return tempCartData
                })
                break;
        }
    }

    const uploadCartData = async (cartData, cartItemsExist) => {
        console.log('uploading data to BE.')
        const axiosUploadCartItems = axios.create(CARTORDERSCONFIG);

        axiosUploadCartItems.interceptors.response.use(
            (response) => {return response},
            async (error) => {
                if(error.response.status === 403){
                    const refreshStatus = await refreshToken();
                    if(refreshStatus === 'success'){
                        return axios.request(error.config)
                    }else if(refreshStatus === 'failure'){
                        document.location.href='/login'
                    }
                }else{
                    return Promise.reject(error)
                }
            }
        )
        if(cartItemsExist){
            console.log('put method')
            axiosUploadCartItems.put('cartorders/30/', {'cart_user': '30', 'cart_items': cartData})
            .then(resp => {console.log(resp)})
            .catch(err => {console.log(err)})
        }else{
            axiosUploadCartItems.post('cartorders/', {})
        }

    }


    useEffect(() => {
        console.log('inside cartDataProvier useEffect')
        getCartItemsData()
        return function cleanup (){
            console.log('inside cartdataprovider cleanup function')
            uploadCartData(cartItemsDataRef.current, cartItemsExistRef.current)
        }
    }, [])
    return(
        <CartDataContext.Provider value={{cartItemsData, cartItemsPrice, updateCartItemsData}}>{children}</CartDataContext.Provider>
    )
}

export default CartDataProvider;
