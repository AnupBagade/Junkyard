import *  as actionConstants from '../ActionConstants/actionConstants';

export const loadMenuItemsAction = (payload) => {
  return{
    type: actionConstants.LOAD_MENUITEMS,
    payload: payload
  }
}
