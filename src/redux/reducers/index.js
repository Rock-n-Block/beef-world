import { combineReducers } from 'redux'

const reducers = ['modal', 'filter', 'facebook', 'user']

export default combineReducers(
    reducers.reduce((initial, name) => {
        initial[name] = require(`./${name}`).default
        return initial
    }, {})
)