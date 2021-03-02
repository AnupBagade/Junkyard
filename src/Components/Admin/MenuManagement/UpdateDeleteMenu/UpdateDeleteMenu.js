import CustomizedTable from '../../../Table/Table';
import {Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const UpdateDeleteMenu = (props) => {

  return(
    <Container style={{paddingBottom:"5%"}}>
      <CustomizedTable
        columns={props.updateDeleteColumns}
        rows={props.firebaseMenuData}
        updateMenu={props.updateMenuHandler}
        deleteMenu={props.deleteMenuHandler}/>
    </Container>
  )
}

export default UpdateDeleteMenu;
