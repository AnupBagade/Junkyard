import React from 'react';

const initialCart = {
    cartItemsData:{},
    cartItemsPrice:{},
    updateCartItems: () => {}
}


const CartDataContext = React.createContext(initialCart)


export default CartDataContext;
