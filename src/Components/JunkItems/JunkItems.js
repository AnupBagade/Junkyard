// import { connect } from 'react-redux';
import JunkItem from './JunkItem/JunkItem';
import { Row, Col, Button, Input } from 'antd';
import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';
import axios from 'axios';
import lodash from 'lodash';
import useLoadPixelItems from '../../CustomHooks/useLoadPixelItems/useloadpixelitems';
import Auxiliary from '../../Auxiliary/Auxiliary';
import firebaseDB from '../../Utils/FirebaseConfiguration/FirebaseConfiguraiton';
import { Container, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { useRouteMatch } from 'react-router-dom';

const JWTTOKENRECIPE = '536effc98213498da780446dddf1606b';
let RECIPESCONFIG = {
  baseURL: 'https://api.spoonacular.com/',
}

const JunkItems = (props) => {
  const menufieldsRequired = ['id', 'largeImageURL'];
  const itemsContainerRef = useRef();
  const [items, setPages] = useLoadPixelItems(menufieldsRequired, 'burgerItems', 'food');
  const [sideBar, setSideBar] = useState(false);
  const [firebaseImageData, setFirebaseImageData] = useState([]);

  useLayoutEffect(() => {
    const onScroll = () => {
      if(window.innerHeight + window.scrollY > itemsContainerRef.current.scrollHeight){
        setPages((prevState) => prevState + 1);
      }
    }
    window.addEventListener('scroll', onScroll);

    return function cleanup(){
      window.removeEventListener('scroll', onScroll);
    }
  }, [])

  return(
    <Auxiliary>
      <div style={{paddingTop:"5%", paddingBottom:"10%"}}>
        <Container>
          <Row gutter={[16,24]} style={{backgroundColor: "#FFFFFF", paddingTop:"5%"}} ref={itemsContainerRef}>
            {items.map((item,index) => {
              return(
                <Col span={8} key={index}>
                  <JunkItem
                    key={item.id}
                    title="test image"
                    image={item.largeImageURL} />
                </Col>
              )
            })}
          </Row>
        </Container>
        {firebaseImageData.map(item => {
          return(
            <Image src={item.imageURI} style={{width:"250px", height:"250px"}}/>
          )})}
      </div>
      <Button style={{backgroundColor:"steelblue"}} size="large">Go To Cart</Button>
    </Auxiliary>
  )
}

// const mapStatetoProps = (state, ownProps) => {
//   return {
//     junkItem: state[ownProps.itemType]
//   }
// }
//
// const mapDispatchtoProps = (dispatch) =>{
//     return{
//       increment : () => dispatch(),
//     }
// }

// export default connect(null, mapDispatchtoProps)(JunkItems);
export default JunkItems;
