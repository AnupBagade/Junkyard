import React, {useState, useContext} from 'react';
import {Modal, Row, Col, Button, Table} from 'react-bootstrap';
import CustomLoader from '../../CustomLoader/CustomLoader';
import CartDataContext from '../../../Context/CartDataContext/CartDataContext';

const CartQuantityModal = (props) => {
    const [loadingStatus, setLoadingStatus] = useState(false)
    const [updateRequestMessage, setUpdateRequestMessage] = useState({message:'', color:'green'})
    const [quantity, setQuantity] = useState(0);
    const cartContext = useContext(CartDataContext);

    const updateQuantity = async () => {
        setLoadingStatus(true)
        await props.updateQuantity(props.itemDetails.item_name, quantity, props.itemDetails.price)
        props.onHide(false)
    }
    return(
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered style={{paddingTop:"15%"}}>
            {
                loadingStatus ?
                (<Row style={{display: 'flex', justifyContent: 'center', paddingTop: "40%", paddingBottom:"40%"}}>
                    <CustomLoader />
                </Row>) :
                (<div>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Order Modification
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table striped bordered hover>
                            <thead>
                                <th>Item Name</th>
                                <th>Old Quantity</th>
                                <th>New Quantity</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{props.itemDetails.item_name}</td>
                                    <td>{props.itemDetails.quantity}</td>
                                    <td><input type="number" min="1" max="5" onChange={(e) => setQuantity(e.target.value)}/></td>
                                </tr>
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => updateQuantity()} variant="success">Update</Button>
                        <Row as={Col}>
                            {updateRequestMessage.message && (<h6 style={{color:`${updateRequestMessage.color}`}}>{updateRequestMessage.message}</h6>)}
                        </Row>
                        <Button onClick={() => props.onHide(false)} variant="danger">Close</Button>
                    </Modal.Footer>
                </div>)
            }
        </Modal>
    )
}

export default CartQuantityModal;
