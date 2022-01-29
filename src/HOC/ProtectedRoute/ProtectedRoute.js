import React, {useEffect, useState} from 'react';
import { Row } from 'react-bootstrap';
import {Route, Redirect} from 'react-router-dom';
import validateUserLoggedIn from '../../TokenManagement/ValidateUserLoggedIn';
import CustomLoader from '../../Components/CustomLoader/CustomLoader';


const ProtectedRoute = ({component:Component, ...rest}) => {
    const [isLoggedIn, setLoggedIn] = useState({loggedIn:'', loaded:false})
    useEffect(async () => {
        const userStatus = await validateUserLoggedIn();
        setLoggedIn((prevState) => {return {loggedIn:userStatus, loaded:true}})
    }, [])

    return(
        <Route {...rest} render={(routerProps) => {
            if(isLoggedIn.loaded){
                if(isLoggedIn.loggedIn ==='success'){
                    return (
                        <Component {...routerProps} {...rest}/>
                    )

                }else{
                    return(
                        <Redirect to={{
                            pathname:'/login',
                            state:{from : routerProps.location}
                        }} />
                    )
                }
            }else{
                return(
                    <Row style={{display: 'flex', justifyContent: 'center'}}>
                      (<CustomLoader />)
                    </Row>
                )
            }
        }}
        />
    )
}

export default ProtectedRoute;
