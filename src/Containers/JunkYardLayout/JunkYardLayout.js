import { Route, Switch } from 'react-router-dom';
import HomePage from '../Homepage/Homepage';
import JunkItems from '../../Components/JunkItems/JunkItems';
import Admin from '../../Components/Admin/Admin';
import JunkYardHeader from '../../Components/Header/Header';
import Auxiliary from '../../Auxiliary/Auxiliary';


const JunkYardLayout = (props) => {
  return(
    <Auxiliary>
      <JunkYardHeader />
      <Switch>
        <Route exact path="/">
          <HomePage name="Home"/>
        </Route>
        <Route exact path="/burger">
          <JunkItems itemType = "Burger"/>
        </Route>
        <Route exact path="/admin">
          <Admin />
        </Route>
      </Switch>
    </Auxiliary>
  )
}

export default JunkYardLayout
