import axios from 'axios';

const TOKENREFRESHURL = 'http://localhost:8080/api/auth/token/refresh/';

const refreshToken = async () => {
    const refreshStatus = {status:''}
    await axios({
        url:TOKENREFRESHURL,
        method: 'post',
        withCredentials: true,
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(resp => {
        refreshStatus.status = 'success'
    })
    .catch(err => {
        refreshStatus.status = 'failed'
    })

    return refreshStatus;
}

export default refreshToken;
