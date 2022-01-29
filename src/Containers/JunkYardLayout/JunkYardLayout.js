import {  Route, Switch, useHistory } from 'react-router-dom';
import CoreProviderContext from '../../Context/CoreProviderContext/CoreProviderContext';
import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import LoginAndRegister from '../../Components/LoginAndRegister/LoginAndRegister';
import Auxiliary from '../../Auxiliary/Auxiliary';
import JunkYardHeader from '../../Components/Header/Header';
import StackOverflow from '../../StackOverflow/Stackoverflow';
import JunkyardProtectedRouter from '../JunkyardProtectedRouter/JunkyardRouter';
import {ToastProvider} from 'react-toast-notifications';
import getUserRole from '../../Context/ContextManagement/GenericFunctions/GetUserRole';

class JunkYardLayout extends Component {

    async componentDidMount(){
        let userRoles = await getUserRole();
        await this.context.updateUserData({...userRoles.roles})
    }

    render(){
        return(
            <ToastProvider>
                <JunkYardHeader />
                <Switch>
                    <Route exact path='/login'>
                        <LoginAndRegister formType='login'/>
                    </Route>
                    <Route exact path='/register'>
                        <LoginAndRegister formType='register'/>
                    </Route>
                    <Route exact path='/StackOverflow'><StackOverflow /></Route>
                    <JunkyardProtectedRouter />
                </Switch>
            </ToastProvider>
        )
    }

}

// Attaching CoreProviderContext to contextType.
JunkYardLayout.contextType = CoreProviderContext;

export default JunkYardLayout
