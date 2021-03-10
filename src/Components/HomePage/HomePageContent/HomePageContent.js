import { Card, Col, Row, Layout, Typography} from 'antd';
import { useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
// import {loadMenuItems, demo, demoTwo} from  '../../../Redux/ActionCreators/actionCreators';
import {demo, demoTwo, loadMenuItems} from  '../../../Redux/ActionCreators/actionCreators';
import CustomLoader from '../../CustomLoader/CustomLoader';
import {store} from '../../../Redux/store';


export const HomePageContent = (props) => {
  const { Content } = Layout;
  const { Meta } = Card;
  const { Title } = Typography;

  return(

    <div style={{paddingTop:"5%", paddingBottom:"10%"}}>
      <Container>
        {props.menuItems.length == 0 ?
          (<Row style={{display: 'flex', justifyContent: 'center'}}>
            <CustomLoader />
          </Row>): null
        }
        // <Button onClick={props.demoAction}>DEMO1</Button>
        // <Button onClick={() => {store.dispatch(demoTwo())}}>DEMO2</Button>
        <div className="site-card-wrapper" data-test="homepage-content">
          <Row gutter={[16,24]} style={{backgroundColor: "#FFFFFF"}}>
            {(props.menuItems).map((el) => {
              return(
                <Col span={8} key={el.menuNameKey}>
                  <Link to={`/${el.menuName}`}>
                    <Card
                      bordered={true}
                      hoverable
                      cover={<img alt="example" src={el.imageURI}/>}
                      data-test={`menu-item-card-${el.menuNameKey}`}
                      >
                      <Meta
                        data-test={`menu-item-title-${el.menuNameKey}`}
                        title={<Title level={3} style={{color:"#000000"}}>{el.menuName}</Title>}
                        style={{textAlign: 'center'}} />
                    </Card>
                  </Link>
                </Col>
            )})}
          </Row>
        </div>
      </Container>
    </div>
  );
}


const mapStatetoProps = (state) =>{
  return {
    menuItems: state.menuItems,
  }
}

// const mapDispatchToProps = (dispatch) =>{
//   return{
//     demoAction: () => demo(dispatch)
//   }
// }


HomePageContent.propTypes = {
  src: PropTypes.string,
  menuItems: PropTypes.array
}

export default connect(mapStatetoProps, null)(HomePageContent);
