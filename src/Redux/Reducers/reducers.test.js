import rootReducer from './reducers';
import lodash from 'lodash';

const menuItemsExpected = [
  {
    menuNameKey: 'MENUPIZZA',
    menuName:'menuPizza',
    imageURI:'https://firebasestorage.googleapis.com/v0/b/junkya…=media&token=5ee6f4f2-9509-431f-93f0-fdd5ff9e86b7'
  }
]

const menuItemsOriginal = {
  MUhnOcGBLfsXuuwuMY :{
      imageURI: "https://firebasestorage.googleapis.com/v0/b/junkya…=media&token=5ee6f4f2-9509-431f-93f0-fdd5ff9e86b7",
      menuName: "menuPizza",
      menuNameKey: "MENUPIZZA",
      variants: 10
  }
}

const initialState = {menuItems:[]}

describe('Reducers - LOAD_MENUITEMS', () => {
  it('Return default state', () => {
    let newState = rootReducer(undefined, {})
    expect(newState).toEqual(initialState)
  })

  it('Restructure firebse data into required format', () => {
    let newState = rootReducer(initialState, {type:'LOAD_MENUITEMS', payload:menuItemsOriginal})
    expect(newState.menuItems).toEqual(menuItemsExpected)
  })
})
