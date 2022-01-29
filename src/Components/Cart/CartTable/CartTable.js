import React, { useState, useContext } from 'react';
import CartTableStyles from './CartTable.module.css';
import { Table, Row, Container, InputGroup, FormControl, Button } from 'react-bootstrap';
import {BsTrashFill, BsPencil} from 'react-icons/bs';
import CartDataContext from '../../../Context/CartDataContext/CartDataContext';
import Confirmation from '../../Alert/Confirmation/Confirmation';
import cartManager from '../CartManager/CartManager';

const CartTable = (props) => {
    const cartData = useContext(CartDataContext)
    const junkuserId = 1

    const [showConfirm, setShowConfirm] = useState(false);
    const [itemDelete, setItemDelete] = useState('');

    const deleteItem = () => {
        props.deleteCartItem(itemDelete)
        setShowConfirm(false)
    }

    const showConfirmationWindow = (itemName) => {
        setShowConfirm(true)
        setItemDelete(itemName)
    }

    const hideConfirmationWindow = () => {
        setShowConfirm(false)
    }

    return(
        <div className={CartTableStyles.cartTable}>
            {showConfirm && (
                <Confirmation
                    title="Delete Item"
                    btnText="Yes"
                    btnStyle="danger"
                    message="Item will be deleted from cart"
                    onConfirm={deleteItem}
                    onCancel={hideConfirmationWindow}
                />
            )}
            <Table striped bordered hover>
                <thead>
                    <tr className={CartTableStyles.cartHeader}>
                        <th>Items</th>
                        <th>Quantity</th>
                        <th>Price Per Item</th>
                        <th>Price</th>
                        <th>Modify</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody className={CartTableStyles.cartDataRow}>
                    {
                        props.cartItemsData['cart_items']?
                        Object.values(props.cartItemsData['cart_items_details']).map(item => {
                            return(
                                <tr key={'cart-table-'+item.item_name}>
                                    <td>{item.item_name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price}</td>
                                    <td>{item.price * item.quantity}</td>
                                    <td onClick={() => props.quantityModal(true, item.item_name, item.quantity, item.price)}><BsPencil/></td>
                                    <td onClick={() => showConfirmationWindow(item.item_name)}><BsTrashFill/></td>
                                </tr>
                            )
                        })
                        : null
                    }
                    {
                        props.cartItemsData['cart_items'] ?
                        (
                            <tr>
                                <td colSpan="3">Total</td>
                                <td colSpan="3">{props.cartItemsData['cart_items'] ? props.cartItemsData['cart_items_total_price'] : null}</td>
                            </tr>
                        ) : null

                    }
                </tbody>
            </Table>
        </div>
    )
}

export default CartTable;
