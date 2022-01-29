import React, { useState, useEffect, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {Container, Row, Col, Button} from 'react-bootstrap';
import axios from 'axios';
import PropTypes from 'prop-types';
import refreshToken from '../../TokenManagement/RefreshToken';
import JunkItem from './JunkItem/JunkItem';
import JunkItemsStyles from './JunkItems.module.css';
import HomePageSliderImage from '../../Media/Images/SliderImages/homepagesliderthree.jpg'
import CartDataProvider from '../../Provider/CartDataProvider/CartDataProvider';
import CartDataContext from '../../Context/CartDataContext/CartDataContext';
import cartManager from '../Cart/CartManager/CartManager';

const AXIOSGETJUNKITEM = {
    baseURL:'http://localhost:8080/api/',
    withCredentials: true,
    headers:{
        'content-type':'application/json',
        'accept':'application/json'
    }
}

const CARTORDERSCONFIG = {
    baseURL:'http://localhost:8080/api/',
    withCredentials: true,
    headers:{
        'content-type':'application/json',
        'accept': 'application/json'
    }
}


const itemImageURLPattern = 'http://localhost:8080/';

const itemImageURLReplace = 'http://localhost:8080/api/';

const JunkItems = (props) => {

    // // user id
    const junkuserId = 1

    // creating state to store junkitems data.
    const [junkItems, setJunkItems] = useState(Array());

    // creating context to access cartDataContext.
    const cartContext = useContext(CartDataContext);

    // creating useHistory object to redirect user based on condition.
    const useHistoryObj = useHistory();

    // creating reference to store cart details by pointing reference to CartDataContext.cartItemsData
    const cartItemsDetailsRef = useRef();

    // add item to cart.
    const addItemToCart = (itemName,itemQuantity, itemPrice, actionType='add') => {

        cartManager({junkuserId:junkuserId, itemName:itemName, itemQuantity:itemQuantity, itemPrice:itemPrice, actionType:actionType})


        // let cartData = [{'item_name': 'Chicken Yard Burger', 'quantity': 5, 'price':40}]
        // let updateData = [{'item_name': 'Chicken Yard Burger', 'quantity': 5, 'price':40}, {'item_name': 'Double Tap Burger', 'quantity': 5, 'price':45.5}, {'item_name': 'Grizzly Burger', 'quantity': 5, 'price':40}]
        // let removeData = ['Chicken Yard Burger', 'Grizzly Burger']
        // let modifyData = [{'item_name': 'Double Tap Burger', 'quantity': 4, 'price':30}]
        // // axiosCartInstance.post('cartorders/', {'cart_user': 1, 'cart_items_details': cartData}).then(resp => {console.log(resp)}).catch(err => {console.log(err.response)})
        // axiosCartInstance.put('cartorders/1/', {'cart_user': 1, 'cart_items_details': updateData, 'action_type': 'add'}).then(resp => {console.log(resp)}).catch(err => {console.log(err.response)})
        // axiosCartInstance.put('cartorders/1/', {'cart_user': 1, 'cart_items': removeData, 'action_type': 'remove'}).then(resp => {console.log(resp)}).catch(err => {console.log(err.response)})
        // axiosCartInstance.put('cartorders/1/', {'cart_user': 1, 'cart_items_details': modifyData, 'action_type': 'update'}).then(resp => {console.log(resp)}).catch(err => {console.log(err.response)})

    }

    // Get junkitems from back-end.
    const getJunkItems = () => {
        // create axios instance using AXIOSGETJUNKITEM object.
        const axiosGetJunkItem = axios.create(AXIOSGETJUNKITEM);
        // creating interceptor to refresh token.
        axiosGetJunkItem.interceptors.response.use(
            response => {return response},
            async error => {
                if(error.response.status == 403){
                    const refreshStatus = await refreshToken();
                    if(refreshStatus.status === 'success'){
                        return axios.request(error.config);
                    }else if(refreshStatus.status === 'failed'){
                        return useHistoryObj.push('/login');
                    }
                }

                return Promise.reject(error);
            }
        )
        // Make a get request to the API endpoint.
        axiosGetJunkItem.get('items/', {params:{item_type:props.itemType}})
        .then(resp =>{
            let items = resp.data.results.map(item => {
                item.item_image = item.item_image.replace(itemImageURLPattern, itemImageURLReplace)
                return item
            })
            setJunkItems((prevState) => {return [...prevState, ...items]});
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        console.log('inside junkitems use state')
        getJunkItems();
        cartItemsDetailsRef.current = cartContext.cartItemsData;
        return function cleanup(){
            console.log('inside junkitems cleanup function')
            console.log(cartItemsDetailsRef.current)
        }
    }, [])


    return(
        <CartDataProvider>
            <div className={JunkItemsStyles.backgroundImage}>
                <Container className={JunkItemsStyles.junkItemsContainer}>
                    <Button onClick={() => addItemToCart()}>Add to cart</Button>
                    {junkItems.map((item, index) => {
                        return(
                            <div className={JunkItemsStyles.junkItemCard} key={`${item.item_name_key}-${index}`}>
                                <JunkItem
                                    key={item.item_name_key}
                                    itemKey={item.item_name_key}
                                    title={item.item_name}
                                    name={item.item_name}
                                    image={item.item_image}
                                    price={item.item_price}
                                    description={item.item_description}
                                    addToCart={addItemToCart}
                                />
                            </div>
                        )
                    })}
                </Container>
            </div>
        </CartDataProvider>
    )
}

export default JunkItems;
