import axios from 'axios';

const AXIOSREGISTERCONFIG = {
    baseURL:'http://localhost:8080/api/',
    headers:{
        'Content-Type' :'application/json'
    }
}

const registerUser = (userData) => {
    let registerStatus = {'status':''}
    const axiosRegister = axios.create(AXIOSREGISTERCONFIG);

    axiosRegister.post('register/',userData)
    .then(resp => {registerStatus.status = 'success'})
    .catch(err => {registerStatus.status = 'failed'})

    return registerStatus;
}

export default registerUser;
