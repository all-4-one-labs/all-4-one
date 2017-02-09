const { createStore, applyMiddleware } =  require('redux')
const thunk = require('redux-thunk').default

const {rootReducer} = require('./reducers/index.js')

module.exports = createStore(rootReducer, applyMiddleware(thunk))
