import React from 'react';
import { Container, Row, Col, Nav, FormControl, InputGroup, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FooterStyles from './Footer.module.css';
import FooterImage from '../../Media/Images/FooterImages/FooterImageOne.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTwitter, faYoutube} from '@fortawesome/free-brands-svg-icons';


const JunkyardFooter = (props) => {
    return (
        <div className={FooterStyles.generic} >
            <Container>
                <Row className={FooterStyles.rowStyle}>
                    <Col className={FooterStyles.column}>
                        <h3 className={FooterStyles.heading}>About Us</h3>
                        <span>
                            <Nav.Link href="#" className={FooterStyles.genericText}>Aim</Nav.Link>
                            <Nav.Link href="#" className={FooterStyles.genericText}>Vision</Nav.Link>
                            <Nav.Link href="#" className={FooterStyles.genericText}>Testimonials</Nav.Link>
                        </span>
                    </Col>
                    <Col className={FooterStyles.column}>
                        <h3 className={FooterStyles.heading}>Services</h3>
                        <Nav.Link href="#" className={FooterStyles.genericText}>Event Catering</Nav.Link>
                        <Nav.Link href="#" className={FooterStyles.genericText}>Custom Food</Nav.Link>
                    </Col>
                    <Col className={FooterStyles.column}>
                        <h3 className={FooterStyles.heading}>Follow Us</h3>
                        <Nav.Link href="#" className={FooterStyles.genericText}>
                            <FontAwesomeIcon icon={faFacebook} color="white"/>
                        </Nav.Link>
                        <Nav.Link href="#" className={FooterStyles.genericText}>
                            <FontAwesomeIcon icon={faInstagram} color="white"/>
                        </Nav.Link>
                        <Nav.Link href="#" className={FooterStyles.genericText}>
                            <FontAwesomeIcon icon={faYoutube} color="white"/>
                        </Nav.Link>
                        <Nav.Link href="#" className={FooterStyles.genericText}>
                            <FontAwesomeIcon icon={faTwitter} color="white"/>
                        </Nav.Link>
                    </Col>
                    <Col className={FooterStyles.column}>
                        <h3 className={FooterStyles.heading}>Contact Us</h3>
                        <p className={FooterStyles.genericText}>Support@Junkyard.com</p>
                        <p className={FooterStyles.genericText}>080-123456, 080-654321</p>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default JunkyardFooter;
