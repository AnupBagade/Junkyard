import {Card, Row, Col, Dropdown, Form, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import JunkItemsStyles from './JunkItem.module.css';
import { useContext, useState } from 'react';
import CartDataContext from '../../../Context/CartDataContext/CartDataContext';


const JunkItem = (props) => {

    const [quantity, setQuantity] = useState(0);

    return(
        <Card className={JunkItemsStyles.junkItem}>
            <Card.Img src={props.image} className={JunkItemsStyles.junkItemImage}/>
            <Card.Body style={{width:"100%"}}>
                <span ><Card.Title>{props.title}</Card.Title></span>
                <Card.Text className={JunkItemsStyles.junkItemDescription}>
                    {props.description}
                </Card.Text>
                <h6>Price: {props.price}</h6>
                <hr className="solid" />
                <span className={JunkItemsStyles.inputType}><input  type="number" min="1" max="10" onChange={(e)=>{setQuantity(e.target.value)}} value={quantity}/></span>

                <span className={JunkItemsStyles.buttonType}>
                    {quantity ?
                        <Button onClick={() => props.addToCart(props.name, quantity, props.price)} variant="success" >Add</Button>
                        : <Button variant="success" disabled>Add</Button>
                    }
                </span>
            </Card.Body>
        </Card>
    );
};

JunkItem.propTypes = {
    title: PropTypes.string,
    name: PropTypes.string,
    image:PropTypes.string,
    price:PropTypes.number
}

export default JunkItem;
