import lodash from 'lodash'

const initialState = {
  menuItems:[],
};

const rootReducer = (state=initialState, action) => {

  switch(action.type){

    case 'LOAD_MENUITEMS':
      let menuItems = Object.entries(action.payload).reduce((result, value) => {
        result.push({...(lodash.pick(value[1], ['menuName', 'menuNameKey', 'imageURI']))})
        return result
      }, [])
      return{...state, ['menuItems']: menuItems}

    case 'DEMO1':
      console.log(action.payload)
      return state

      case 'DEMO2':
        console.log(action.payload)
        return state

    default:
      return state
  }
};

export default rootReducer;
