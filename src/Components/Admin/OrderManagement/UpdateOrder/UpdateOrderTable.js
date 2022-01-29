import {Table, Row, Container, Button, ButtonGroup, ButtonToolbar, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';



const UpdateOrderTable = (props) => {
    return(
        <div style={{paddingTop: "5%"}}>
            <Table striped bordered hover>
                <thead style={{color:"white", backgroundColor:"#212529"}}>
                    <tr style={{textAlign:"center"}}>
                        <th>Order ID</th>
                        <th>Order Status</th>
                        <th>Order Created</th>
                        <th>User Mobile No.</th>
                        <th>Details</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {props.orderSearchResults.map(order => {
                        return(
                            <tr style={{textAlign:"center"}} key={order.order_id}>
                                <td
                                    key={`Order -${order.order_id}`}
                                    data-test="update-order-table-body-itemType">
                                    {order.order_id}
                                </td>
                                <td
                                    key={`Order -${order.order_id} - ${order.order_status}`}
                                    data-test="update-order-table-body-itemType">
                                    {order.order_status}
                                </td>
                                <td
                                    key={`Order -${order.order_id} - ${order.ordered_date}`}
                                    data-test="update-order-table-body-itemType">
                                    {order.ordered_date}
                                </td>
                                <td
                                    key={`Order -${order.order_id} - ${order.order_user_mobile_number}`}
                                    data-test="update-order-table-body-itemType">
                                    {order.order_user_mobile_number}
                                </td>
                                <td
                                    key={`Order Details -${order.order_id}`}
                                    data-test="update-order-table-body-itemType">
                                    Order Details
                                </td>
                                <td
                                    key={`Approve/Cancel Order -${order.order_id}`}
                                    data-test="update-order-table-body-itemType">
                                    <Form inline>
                                        <Button variant="outline-success" onClick={() => props.processPendingOrder("approve", order.order_id)}>Approve</Button>
                                        <hr className="solid"/>
                                        <Button variant="outline-danger" onClick={() => props.processPendingOrder("cancel", order.order_id)}>Cancel</Button>
                                    </Form>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}

UpdateOrderTable.propTypes = {
    orderSearchResults: PropTypes.array
}

export default UpdateOrderTable
