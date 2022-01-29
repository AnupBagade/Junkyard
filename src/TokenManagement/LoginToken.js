import axios from 'axios';

const LOGINUSERCONFIG = {
    baseURL:"http://localhost:8080/api/auth/",
    withCredentials: true,
    headers:{
        'Content-Type':'application/json'
    }
}

const getLoginToken = async (creds) => {
    const loginStatus = {message:'', userData:{}}
    const axiosLoginUserConfig = axios.create(LOGINUSERCONFIG);

    await axiosLoginUserConfig.post('login/', {
        'email': creds.email,
        'password': creds.password
    })
    .then(resp => {
        console.log(resp)
        if(resp.status === 200){
            loginStatus.message = 'success'
            loginStatus.userData = {...resp.data.user}
        }
    })
    .catch(err => {
        console.log(err)
        loginStatus.message = 'failed'
    })

    return loginStatus;
}

export default getLoginToken;
