import { combineReducers } from 'redux'

const reducers = ['signin']

export default combineReducers(
    reducers.reduce((initial, name) => {
        initial[name] = require(`./${name}`).default
        return initial
    }, {})
)