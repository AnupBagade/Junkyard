import checkPropTypes from 'check-prop-types';
import { middlewares } from '../../Redux/store';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../../Redux/Reducers/reducers';

export const findByTestAttr = (component, attribute) => {
  const wrapper = component.find(`[data-test='${attribute}']`)
  return wrapper;
}

export const checkProps = (component, expectedProps) => {
  const propsError = checkPropTypes(component.propTypes, expectedProps, 'props', component.name);
  return propsError
}

export const mockStore = (initialState) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
  return createStoreWithMiddleware(rootReducer, initialState)
}
