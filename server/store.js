const { createStore, applyMiddleware } =  require('redux')
const thunk = require('redux-thunk').default

const {appReducer} = require('./reducers/index.js')

module.exports = createStore(appReducer, applyMiddleware(thunk))
