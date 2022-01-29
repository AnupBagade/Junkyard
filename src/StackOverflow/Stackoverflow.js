import React, { useState , useEffect,  Component} from 'react';
import {Button, Container} from 'react-bootstrap'
import axios from 'axios';


const StackOverflow = () => {
    useEffect(() => {
        console.log('inside useeffect')
        axios.post('http://localhost:8080/api/auth/login/',
            {'email':'Junkadmin@junkyard.com', 'password':'Junky@123'},
            {withCredentials:true},
            {headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }}
        )
        .then(resp => {
            console.log(resp)
        }).catch(err => {console.log(err)})

        // fetch('http://localhost:8000/api/auth/login/', {
        //     method: 'POST',
        //     credentials: 'include',
        //     headers: {
        //     'Content-Type': 'application/json',
        //     'Accept': 'application/json',
        //     },
        //     body:  JSON.stringify({'email':'Junkadmin@junkyard.com', 'password':'Junky@123'})
        // }).then(resp => {
        //     console.log(resp)
        // })
    }, [])

    // const getJunkUserDetails = async () => {
    //     axios.get('http://127.0.0.1:8000/api/junkusers/', {headers:{Authorization:'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjMwMjQxNTYzLCJqdGkiOiIxMGE2OWM2NDU2Y2Y0ZmUyOGJlOGQ4OTkxM2Y3MDY1OSIsInVzZXJfaWQiOjI5fQ.2HclKsbPvXiAWV8PjzlcdOVt7ED9es_DLVpIfeVQ6zg'}}).then(resp => {console.log(resp)}).catch(err => {console.log(err)})
    // }

    const axiosGetJunkUserDetails = axios.create({
        baseURL:'http://localhost:8080/api/',
        withCredentials: true,
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })
    const getJunkUserDetails = async () => {

        axiosGetJunkUserDetails.get('junkusers/').then(resp => {console.log(resp)}).catch(err => {console.log(err)})

        axiosGetJunkUserDetails.interceptors.response.use(
            // If request is succesfull, return response.
            (response) => {return response},
            // If error occured, refresh token and try again.
            (error) => {
                const originalRequest = error.config;
                console.log(originalRequest)
                // Make a call to refresh token and get new access token.
                axios('http://localhost:8080/api/auth/token/refresh/', {
                    method:'post',
                    withCredentials: true
                }).then(resp => {
                    console.log(resp);
                }).catch(err => {
                    // push user to login page.
                    console.log(err)
                })
                // Return original request.
                return axios(originalRequest)

                return Promise.reject(error)
            }
        )


        // axios.get('http://localhost:8080/api/junkusers/', {
        //     withCredentials:true,
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json',
        //     },
        // })
        // .then(resp => {console.log(resp)})
        // .catch(err => {console.log(err)})
        // fetch('http://localhost:8000/api/junkusers/', {
        //     method: 'GET',
        //     credentials: 'include',
        //     headers: {
        //     'Content-Type': 'application/json',
        //     'Accept': 'application/json',
        //     }
        // }).then(resp => {
        //     console.log(resp.json())
        // })
    }

    const refreshToken = async() => {
        axios('http://localhost:8080/api/auth/token/refresh/',{
            method: 'post',
            withCredentials: true
        }).then(resp => {console.log(resp)}).catch(err => {console.log(err.detail)})
    }

    return (
        <Container maxWidth="lg" style={{paddingTop:"5%"}}>
            <Button onClick={() => {getJunkUserDetails()}}>Make Request</Button>
            <Button onClick={() => {refreshToken()}}>Refresh Token</Button>
        </Container>
    )
}


export default StackOverflow;
