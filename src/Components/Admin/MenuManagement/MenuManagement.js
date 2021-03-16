import {Row} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import firebaseDB from '../../../Utils/FirebaseConfiguration/FirebaseConfiguraiton';
import lodash from 'lodash';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddMenu from './AddMenu/AddMenu';
import UpdateDeleteMenu from './UpdateDeleteMenu/UpdateDeleteMenu';
import CustomLoader from '../../CustomLoader/CustomLoader';


const MenuManagement = () =>{
  const [initialMenuValues, setInitialMenuValues] = useState({
    requestType:'Menu',
    menuName:'',
    imageURI:'',
  })
  const [firebaseMenuData, setFirebaseMenuData] = useState([]);
  const [loadData, setLoadData] = useState(false);
  const [loading, setLoading] = useState(false);
  const updateDeleteColumns = ['Menu', 'Variants', 'Update', 'Delete'];
  const firebaseColumns = ['menuName', 'variants', 'menuNameKey'];
  // const menuNameKey = 'menuNameKey'

  const updateMenuItemHandler = (menuNameKey, menuName, event) => {
    setInitialMenuValues(prevState => {
      return{
        ...prevState,
        ['menuName']: menuName
      }
    })
  }

  const deleteMenuItemHandler = async (menuId, event) => {
    await firebaseDB.ref('Menu/'+menuId).remove()
    .then(() => {console.log('data removed successfully')})
    .catch((error) => {console.log('Unable to delete data')})
    setLoadData(prevState => !prevState);
  }

  const restructureFirebaseData = (menuObject) =>{
    let newStructuredData = Object.entries(menuObject).reduce((result, value)=>{
      result.push({...(lodash.pick(value[1], firebaseColumns)), ["menuId"]: value[0]})
      return result
    }, [])
    return newStructuredData
  }

  const getMenuFirebaseDetails = async () => {
    setLoading(prevState => true)
    let snapshot = await firebaseDB.ref('Menu').once('value')
    let menuData = snapshot.val()? restructureFirebaseData(snapshot.val()) : false;
    if(menuData){
        console.log(menuData)
        setFirebaseMenuData(prevState => {return {...menuData}})
    }else{
      console.log('Item not available')
    }
    setLoading(prevState => false)
  }

  const loadMenuTable = () => {
    setLoadData(prevState => !prevState);
  }

  useEffect(()=>{
    console.log('inside useeffect')
    getMenuFirebaseDetails();
  }, [loadData])

  return(
    <div>
      <AddMenu initialData={initialMenuValues} loadMenuTable={loadMenuTable}/>
      <Row style={{display: 'flex', justifyContent: 'center'}}>
        {loading && (<CustomLoader />)}
      </Row>
      <UpdateDeleteMenu
        updateDeleteColumns={updateDeleteColumns}
        firebaseMenuData={firebaseMenuData}
        updateMenuHandler={updateMenuItemHandler}
        deleteMenuHandler={deleteMenuItemHandler}/>
    </div>
  )
}

export default MenuManagement;
