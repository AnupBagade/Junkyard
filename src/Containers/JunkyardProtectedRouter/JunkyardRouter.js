import React, { Component } from 'react';
import ProtectedRoute from '../../HOC/ProtectedRoute/ProtectedRoute';
import { Switch } from 'react-router-dom';
import Admin from '../../Components/Admin/Admin';
import HomePage from '../Homepage/Homepage';
import CartManagement from '../../Components/Cart/CartManagement';
import JunkItems from '../../Components/JunkItems/JunkItems';
import CartDataProvider from '../../Provider/CartDataProvider/CartDataProvider';


class JunkyardProtectedRouter extends Component{


    render(){
        return(
            <Switch>
                <ProtectedRoute exact path="/" component={HomePage} />
                <ProtectedRoute exact path="/admin" component={Admin} />
                <ProtectedRoute exact path="/cart" component={CartManagement} />
                <ProtectedRoute exact path="/burger" component={JunkItems} itemType="burger"/>
                <ProtectedRoute exact path="/chicken" component={JunkItems} itemType="chicken"/>
                <ProtectedRoute exact path="/dessert" component={JunkItems} itemType="dessert"/>
                <ProtectedRoute exact path="/donught" component={JunkItems} itemType="donught"/>
                <ProtectedRoute exact path="/fries" component={JunkItems} itemType="fries"/>
                <ProtectedRoute exact path="/pasta" component={JunkItems} itemType="pasta"/>
                <ProtectedRoute exact path="/pizza" component={JunkItems} itemType="pizza"/>
                <ProtectedRoute exact path="/seafood" component={JunkItems} itemType="seafood"/>
                <ProtectedRoute exact path="/sandwich" component={JunkItems} itemType="sandwich"/>
            </Switch>
        )
    }
}


export default JunkyardProtectedRouter;
