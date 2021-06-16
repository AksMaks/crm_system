import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'

import CommonReducer from './CommonReducer.js';
import CashboxReducer from './CashboxReducer.js';
import NavBarReducer from './NavBarReducer.js';
import ManagerReducer from './ManagerReducer.js';
import NotificationsReducer from './NotificationsReducer.js';

let redusers = combineReducers({
    form: formReducer,
	Common: CommonReducer,
    Cashbox: CashboxReducer,
	NavBar: NavBarReducer,
    Manager: ManagerReducer,
    Notifications: NotificationsReducer
});

let store = createStore(redusers, applyMiddleware(thunkMiddleware));

export default store;