import { reducer as formReducer } from 'redux-form'
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux'

export default combineReducers({
    form: formReducer,
    routing: routerReducer
})
