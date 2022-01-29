import React from 'react';

const CARTDATA = {
  "items_details": [
    {
      "item_name": "Chicken",
      "quantity": 5
    },
    {
      "item_name": "Hamburger",
      "quantity": 7
    },
    {
      "item_name": "Pizza",
      "quantity": 123
    }
  ],
  "items": [
    "Chicken",
    "Hamburger",
    "Pizza"
  ],
  "total_price": 1800
}

const initialState = {
    cartItems: {},
    userId: '',
    userEmail: ''
}


const contextState = {
    contextState: initialState,
    updateCartItems: () => {},
    updateUserId:'',
    updateUserEmail:''


}

export const JunkyardContext = React.createContext(contextState);
