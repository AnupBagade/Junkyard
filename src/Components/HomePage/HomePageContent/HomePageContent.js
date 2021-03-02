import { Card, Col, Row, Layout, Typography} from 'antd';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


const mapStatetoProps = (state) =>{
  return {
    menuItems: state.menuItems
  }
}

const HomePageContent = (props) => {
  const { Content } = Layout;
  const { Meta } = Card;
  const { Title } = Typography;
  return(
    <div style={{paddingTop:"5%", paddingBottom:"10%"}}>
      <Container>
        <div className="site-card-wrapper">
          <Row gutter={[16,24]} style={{backgroundColor: "#FFFFFF"}}>
            {Object.keys(props.menuItems).map((el, index) => {
              return(
                <Col span={8} key={index}>
                  <Link to={`/${el}`}>
                    <Card
                      bordered={true}
                      hoverable
                      cover={<img alt="example" src={props.menuItems[el]}
                      />}>
                      <Meta
                        title={<Title level={3} style={{color:"#000000"}}>{el}</Title>}
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


export default connect(mapStatetoProps)(HomePageContent);
