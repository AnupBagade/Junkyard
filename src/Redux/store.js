import { createStore, applyMiddleware } from 'redux';
import rootReducer from './Reducers/reducers';
import ReduxThunk from 'redux-thunk';


export const middlewares= [ReduxThunk]

export const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

// const store = createStore(rootReducer, applyMiddleware(thunk));
export const store = createStoreWithMiddleware(rootReducer);
