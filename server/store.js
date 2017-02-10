const { createStore, applyMiddleware } =  require('redux')
const thunk = require('redux-thunk').default
// const createLogger = require('redux-logger');

const {appReducer} = require('./reducers/index.js')

module.exports = createStore(appReducer, applyMiddleware(/*createLogger({collapsed: true}),*/ thunk))