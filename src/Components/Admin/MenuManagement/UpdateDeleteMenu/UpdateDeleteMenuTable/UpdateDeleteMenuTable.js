import {Table, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BsTrashFill, BsPencil} from 'react-icons/bs';

export default function UpdateDeleteMenuTable(props) {
    return (
        <Table striped bordered hover >
            <thead style={{color:"white", backgroundColor:"#212529"}} data-test="update-delete-menu-table-header">
                <tr style={{textAlign:"center"}}>
                  {props.columns.map(column =>{
                    return(<th key={column}>{column}</th>)
                  })}
                </tr>
            </thead>
            <tbody data-test="update-delete-menu-table-body">
                {Object.values(props.rows).map((value) => {
                    return(
                    <tr key={value.menuId} style={{textAlign:"center"}} data-test={`update-delete-menu-table-row-${value.menuNameKey}`}>
                        <td
                            key={'Menu-'+value.menuNameKey}
                            data-test="update-delete-menu-table-body-menuName">
                            {value.menuName}
                        </td>
                        <td
                            key={value.menuNameKey+'-'+value.variants}
                            data-test="update-delete-menu-table-body-variant">
                            {value.variants}
                        </td>
                        <td
                            key={value.menuNameKey+'-edit'}
                            data-test="update-delete-menu-table-body-update">
                            <BsPencil onClick={(event) => props.updateMenu(value.menuNameKey, value.menuName, event)}/>
                        </td>
                        <td
                            key={value.menuNameKey+'-delete'}
                            data-test="update-delete-menu-table-body-delete">
                            <BsTrashFill onClick={(event) => props.deleteMenu(value.menuId, event)} />
                        </td>
                    </tr>
                    )
                })}
            </tbody>
        </Table>
    );
}
