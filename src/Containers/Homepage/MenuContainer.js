import React, { useState } from 'react';
import { Card, Col, Row, Layout, Typography, Button} from 'antd';
import axios from 'axios';
import {pick} from 'lodash';

const JWTTOKENNEWS = '948e4a801ae942fe89622a0b7955978c';
const JWTTOKENRECIPE = '536effc98213498da780446dddf1606b';
let recipesConfig = {
  baseURL: 'https://api.spoonacular.com/',
}

function MenuItem(props){
  const { Content } = Layout;
  const { Meta } = Card;
  const { Title } = Typography;
  return(
    <Col span={6}>
      <Card
        bordered={true}
        hoverable
        cover={<img alt="example" src={props.image}
        />}>
        <Meta
          title={<Title level={3} style={{color:"#000000"}}>{props.title}</Title>}
          style={{textAlign: 'center'}} />
      </Card>
    </Col>
  )
}

const MenuContainer = (props) => {
  const menufieldsRequired = ['id','title', 'restaurantChain', 'image']

  const [recipes, setRecipes] = useState([]);

  const [status, setStatus] = useState(false);

  const getNews = () => {
    let axiosRecipes = axios.create(recipesConfig);

    axiosRecipes.interceptors.response.use((response) => {
      console.log(response.data)
      let items = response.data.menuItems.map(el => {
        return pick(el, menufieldsRequired)
      })
      response.menuItems = items
      return response
    },
     (error) => {
      return Promise.reject(error);
    });

    axiosRecipes.get('food/menuItems/search', {
      params:{
        apiKey: JWTTOKENRECIPE,
        query: 'burger',
        number: 10
      }})
      .then((resp) => {
      setRecipes(resp.menuItems);
      setStatus(true);})
      .catch(err => {
      setStatus(false);
      console.log(err)
    })
  }

  let menuItems = recipes.map((el, index) => {
    return(
      <MenuItem
        key={el.id}
        title={el.title}
        restaurantChain={el.restaurantChain}
        image={el.image}/>
    )
  })

  return(
    <div>
      <Button onClick={() => getNews()}>FETCH NEWS</Button>
      <div className="site-card-wrapper">
        <Row gutter={[16,24]} style={{backgroundColor: "#FFFFFF"}}>{menuItems}</Row>
      </div>
    </div>
  )
}


export default MenuContainer;
