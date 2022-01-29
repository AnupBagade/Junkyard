import React, {Component} from 'react';
import Login from './Login/Login';
import Register from './Register/Register';
import getUserRole from '../../Context/ContextManagement/GenericFunctions/GetUserRole';

const LoginAndRegister = (props) =>{

    const updateUserRoles = async (updateUserData) => {
        let userRoles = await getUserRole();
        await updateUserData({...userRoles.roles})
    }
    return(
        <div>
        {props.formType === 'login' ? (<Login updateUserRoles={updateUserRoles}/>) : (<Register updateUserRoles={updateUserRoles}/>)}
        </div>
    )
}

export default LoginAndRegister
