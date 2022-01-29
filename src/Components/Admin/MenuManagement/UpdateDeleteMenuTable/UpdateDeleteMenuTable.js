import {Table, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BsTrashFill, BsPencil} from 'react-icons/bs';

export default function UpdateDeleteMenuTable(props) {
    console.log(props)
    return (
        <Table striped bordered hover >
            <thead style={{color:"white", backgroundColor:"#212529"}} data-test="update-delete-menu-table-header">
                <tr style={{textAlign:"center"}}>
                  {props.updateDeleteColumns.map(column =>{
                    return(<th key={column}>{column}</th>)
                  })}
                </tr>
            </thead>
            <tbody data-test="update-delete-menu-table-body">
                {Object.values(props.menuData).map((value) => {
                    return(
                    <tr  key={value.menu_id} style={{textAlign:"center"}} data-test={`update-delete-menu-table-row-${value.menu_name_key}`}>
                        <td
                            key={'Menu-'+value.menu_name_key}
                            data-test="update-delete-menu-table-body-menu_name">
                            {value.menu_name}
                        </td>
                        <td
                            key={value.menu_name_key+'-edit'}
                            data-test="update-delete-menu-table-body-update">
                            <BsPencil onClick={(event) => props.loadMenuDataHandler(value.menu_id, event)}/>
                        </td>
                        <td
                            key={value.menu_name_key+'-delete'}
                            data-test="update-delete-menu-table-body-delete">
                            <BsTrashFill onClick={(e) => props.deleteMenuHandler(value.menu_id, e)} />
                        </td>
                    </tr>
                    )
                })}
            </tbody>
        </Table>
    );
}
