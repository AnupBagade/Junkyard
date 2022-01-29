import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ImageCooking from '../../../Media/Images/HomePageInformation/ImageCooking.png';
import ImageQuality from '../../../Media/Images/HomePageInformation/ImageQuality.png';
import ImageDelivery from '../../../Media/Images/HomePageInformation/ImageDelivery.png';
import ImageRecycle from '../../../Media/Images/HomePageInformation/ImageRecycle.png';
import ImageSpam from '../../../Media/Images/HomePageInformation/ImageSpam.png';
import ImageFeedback from '../../../Media/Images/HomePageInformation/ImageFeedback.png';
import HomePageInformationStyles from './HomePageInformation.module.css';

const HomePageInformation = (props) => {

    return(
        <Container className={HomePageInformationStyles.informationContainer}>
            <Row style={{paddingBottom:"26px"}}>
                <Col sm={6} className={HomePageInformationStyles.columnStyle}>
                    <img src={ImageCooking} className={HomePageInformationStyles.imageStyle}/>
                    <p>Our Chefs, make sure every item is fresh and cooked perfectly before it reaches our customers.</p>
                </Col>
                <Col sm={6}  className={HomePageInformationStyles.columnStyle}>
                    <img src={ImageQuality} className={HomePageInformationStyles.imageStyle}/>
                    <p>Every ingredients used in junkyard will undergo severe quality checks before turning ingredients into your food.</p>
                </Col>
            </Row>
            <Row style={{paddingBottom:"26px"}}>
                <Col sm={6}  className={HomePageInformationStyles.columnStyle}>
                    <img src={ImageDelivery} className={HomePageInformationStyles.imageStyle} />
                    <p>Our employees make sure you get your order on time, without harming your expectations.</p>
                </Col>
                <Col sm={6}  className={HomePageInformationStyles.columnStyle}>
                    <img src={ImageRecycle} className={HomePageInformationStyles.imageStyle}/>
                    <p>Junkyard uses renewable resources and recyclable products.We are reucing carbon emission and trying to be as much as environmental friendly.</p>
                </Col>
            </Row>
            <Row>
                <Col sm={6}  className={HomePageInformationStyles.columnStyle}>
                    <img src={ImageSpam} className={HomePageInformationStyles.imageStyle} />
                    <p>We don't spam your inbox with our products details and share user details with others. We respect customer privacy and inbox memory.</p>
                </Col>
                <Col sm={6}  className={HomePageInformationStyles.columnStyle}>
                    <img src={ImageFeedback} className={HomePageInformationStyles.imageStyle}/>
                    <p>We take feedback and genuine complaints seriously. We always open for suggestions.</p>
                </Col>
            </Row>
        </Container>
    )
}


export default HomePageInformation;
