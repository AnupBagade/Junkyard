import React, { useState, useEffect } from 'react';
import { Redirect, Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import refreshToken from '../../../TokenManagement/RefreshToken';
import CustomLoader from '../../CustomLoader/CustomLoader';
import { Container, Button, Card, Row, Col } from 'react-bootstrap';
import HomePageStyle from './HomePageContent.module.css';


const AXIOSGETMENUCONFIG = {
    baseURL:'http://localhost:8080/api/',
    withCredentials: true,
    headers:{
        'Content-Type':'application/json',
        'Accept': 'application/json'
    }
}

const menuImageURLPattern = 'http://localhost:8080/';
const menuImageURLReplace = 'http://localhost:8080/api/';

const HomePageContent = (props) => {

    const [menuItems, setMenuItems] = useState({});

    const axiosGetMenu = axios.create(AXIOSGETMENUCONFIG);

    const historyObj = useHistory();

    useEffect(async () => {

        axiosGetMenu.interceptors.response.use(
            (response) => {return response},
            async (error) => {
                const refreshStatus = await refreshToken();
                if(refreshStatus.status==='success'){
                    return axios.request(error.config)
                }else{
                    historyObj.push('/login');
                }
                return Promise.reject(error)
            }
        )

        await axiosGetMenu.get('menu/')
        .then(resp => (setMenuItems(resp.data)))
        .catch(err => {console.log(`Request Failed- ${err}`)})
    }, [])

    return(
          <Container className={HomePageStyle.homePageMenuContainer}>
            {menuItems.length == 0 ?
              <Row id="homepageLoader" style={{display: 'flex', justifyContent: 'center'}}>
                <CustomLoader />
              </Row>: null
            }
            {Object.values(menuItems).map(item => {
                return(
                    <div style={{paddingTop:"50px", paddingBottom:"50px", paddingRight:"10px"}}>
                        <Card className={HomePageStyle.menuCard}>
                            <Card.Img variant="bottom" src={item.menu_image.replace(menuImageURLPattern, menuImageURLReplace)} />
                            <Card.Body>
                                <Card.Title ><Link to={`/${item.menu_name.toLowerCase()}`} className={HomePageStyle.cardTitleStyle}>{item.menu_name}</Link></Card.Title>
                            </Card.Body>
                        </Card>
                    </div>


                )
            })}
          </Container>
    )
}

export default HomePageContent;
