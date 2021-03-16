import UpdateDeleteMenuTable from './UpdateDeleteMenuTable/UpdateDeleteMenuTable';
import {Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';


const UpdateDeleteMenu = (props) => {

  return(
    <Container style={{paddingBottom:"5%"}}>
      <UpdateDeleteMenuTable
        columns={props.updateDeleteColumns}
        rows={props.firebaseMenuData}
        updateMenu={props.updateMenuHandler}
        deleteMenu={props.deleteMenuHandler}/>
    </Container>
  )
}

UpdateDeleteMenu.propTypes = {
    updateDeleteColumns: PropTypes.array.isRequired,
    firebaseMenuData: PropTypes.array.isRequired,
    updateMenuHandler: PropTypes.func.isRequired,
    deleteMenuHandler: PropTypes.func.isRequired
}

export default UpdateDeleteMenu;
