import axios from 'axios';
import {Redirect, useHistory} from 'react-router-dom';
import refreshToken from './RefreshToken';


const VALIDATEUSERAXIOSCONFIG = {
    baseURL:'http://localhost:8080/api/',
    withCredentials: true,
    headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}

const validateUserLoggedIn = async () => {
    const loggedIn = {status:''}

    const axiosValidateUserLoggedIn = axios.create(VALIDATEUSERAXIOSCONFIG);

    axiosValidateUserLoggedIn.interceptors.response.use(
        (resp) => {return resp},
        (err) => {
            const originalRequest = err.config;

            const refreshTokenStatus = refreshToken();

            if(refreshTokenStatus === 'success'){
                return axios(originalRequest)
            }else{
                window.location.href = '/login';
            }
            // Does this necessary
            return Promise.reject(err)
        }
    )

    await axiosValidateUserLoggedIn.get('userloggedin/')
    .then((resp) => {
        loggedIn.status = resp.data.loggedIn
    })


    console.log(`inside validateUserLoggedIn  - ${loggedIn.status}`)
    return loggedIn.status;
}


export default validateUserLoggedIn;
