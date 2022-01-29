import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BsTrashFill, BsPencil} from 'react-icons/bs';


const UpdateDeleteItemTable = (props) =>{
    console.log(props)
    return(
        <div style={{paddingTop:"5%"}}>
            <Table striped bordered hover>
                <thead style={{color:"white", backgroundColor:"#212529"}}>
                    <tr style={{textAlign:"center"}}>
                      {props.updateDeleteColumns.map(itemCol => {
                          return(<th>{itemCol}</th>)
                      })}
                    </tr>
                </thead>
                <tbody>
                    {props.itemsList.map((item) => {
                        return(
                            <tr key={item.item_id} style={{textAlign:"center"}}>
                                <td
                                    key={item.item_name_key +' - itemType'}
                                    data-test="update-delete-item-table-body-itemType">
                                    {item.item_type}
                                </td>
                                <td
                                    key={item.item_name_key +' - itemName'}
                                    data-test="update-delete-item-table-body-itemName">
                                    {item.item_name}
                                </td>
                                <td
                                    key={item.item_name_key +' - itemDietType'}
                                    data-test="update-delete-item-table-body-itemDietType">
                                    {item.item_diet_type}
                                </td>
                                <td
                                    key={item.item_name_key +' - update'}
                                    data-test="update-delete-item-table-body-edit">
                                    <BsPencil onClick={event => props.loadItemDetailsHandler(item.item_id, event)}/>
                                </td>
                                <td
                                    key={item.item_name_key +' - delete'}
                                    data-test="update-delete-item-table-body-delete">
                                    <BsTrashFill  onClick={(event) => props.deleteItemHandler(item.item_id, event)}/>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </Table>
        </ div>
    )

}

export default UpdateDeleteItemTable
