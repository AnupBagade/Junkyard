import {Table, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BsTrashFill, BsPencil} from 'react-icons/bs';

export default function CustomizedTable(props) {
  return (
    <Table striped bordered hover >
      <thead style={{color:"white", backgroundColor:"#212529"}}>
        <tr style={{textAlign:"center"}}>
          {props.columns.map(column =>{
            return(<th>{column}</th>)
          })}
        </tr>
      </thead>
      <tbody>
        {Object.values(props.rows).map((value) => {
          return(
            <tr key={value.menuId} style={{textAlign:"center"}}>
              <td key={'Menu-'+value.menuNameKey}>{value.menuName}</td>
              <td key={value.menuNameKey+'-'+value.variants}>{value.variants}</td>
              <td key={value.menuNameKey+'-edit'}><BsPencil onClick={(event) => props.updateMenu(value.menuNameKey, value.menuName, event)} /></td>
              <td key={value.menuNameKey+'-delete'}><BsTrashFill onClick={(event) => props.deleteMenu(value.menuId, event)} /></td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  );
}
