import axios from 'axios';
import refreshToken from '../../../TokenManagement/RefreshToken';
import { Redirect } from 'react-router-dom';

const JUNKUSERCONFIG = {
    baseURL: 'http://localhost:8080/api/',
    withCredentials: true,
    headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
    }
}

const JunkuserBackEndFields = {
    isCustomer : 'junkuser_is_customer',
    isEmployee : 'junkuser_is_employee',
    isAdmin : 'is_superuser'
}

const getUserRole = async () => {

    let userRoles = {status:'', roles:{}}

    // create axios instance using JUNKUSERCONFIG.
    const axiosGetUserRole = axios.create(JUNKUSERCONFIG);

    // Create interceptors to handle forbidden requests.
    axiosGetUserRole.interceptors.response.use(
        response => { return response },
        async (error) => {
            if(error.response.status === 403){
                const refreshStatus = await refreshToken();
                if (refreshStatus.status === 'success'){
                    return axios.request(error.config)
                }else{
                    console.log(`Refresh status - ${refreshStatus.status}`)
                    return (<Redirect to={'/'} />)
                }
            }
            return Promise.reject(error)
        }
    )

    // Make a get request.
    await axiosGetUserRole.get('userrole/')
    .then(resp => {
        userRoles.status = 'success'
        userRoles.roles = {...resp.data}
    })
    .catch(err => {
        console.log(err)
        console.log(err.response)
    })

    return userRoles
}

export default getUserRole;
