import * as menuActions from '../Actions/actions';
import firebaseDB from '../../Utils/FirebaseConfiguration/FirebaseConfiguraiton';
import axios from 'axios';

export function loadMenuItems(){
  console.log('inside action creator')
  return async dispatch => {
    firebaseDB.ref('Menu').once('value').then(snapshot => {
      dispatch(menuActions.loadMenuItemsAction(snapshot.val()))
    }).catch(err => {console.log(err)})
  }
}


export function demo(dispatch){
  dispatch({type:'DEMO1', payload:{test1:'test1'}})
}


export function demoTwo(dispatch) {
  return dispatch({type:'DEMO2', payload:{test2:'test2'}})
}
