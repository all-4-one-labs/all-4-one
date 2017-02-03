const { createStore, applyMiddleware } =  require('redux')
const thunk = require('redux-thunk').default

const reducer =  require('./reducers/index.js')

module.exports = createStore(reducer, applyMiddleware(thunk))
