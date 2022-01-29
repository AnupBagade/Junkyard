import React, { Component } from 'react';
import CoreProviderContext from '../../Context/CoreProviderContext/CoreProviderContext';

const LOGINUSERCONFIG = {
    baseURL:"http://localhost:8080/api/auth/",
    withCredentials: true,
    headers:{
        'Content-Type':'application/json'
    }
}

class CoreProvider extends Component{

    constructor(props){
        super(props)
        this.state = {
            userData: {email:'', isCustomer: '', isEmployee: '', isAdmin:''},
            endPointsConfigs: {loginEndPointConfig: LOGINUSERCONFIG},
            updateUserData: this.updateUserData
        }
    }

    updateUserData = (userData) => {
        this.setState(prevState => {
            return {
                ...prevState,
                ['userData'] : {...userData}
            }
        })
    }

    render(){
        return(
            <CoreProviderContext.Provider value={this.state}>
                {this.props.children}
            </CoreProviderContext.Provider>
        )
    }
}

export default CoreProvider
