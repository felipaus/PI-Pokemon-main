import {applyMiddleware, createStore, } from 'redux'
import  reducer  from './reduce'
import thunk from "redux-thunk"

//asi creo la store
const store=createStore(reducer,applyMiddleware(thunk))//tunck para poder hacer acciones con promesas 

export default store