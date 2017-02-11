const players  = require('../../browser/reducers/players.js');
const { expect } = require('chai');
const {createStore, combineReducers} = require('redux');

describe('player reducers', () => {
    let store;

    beforeEach('create a test store', () => {
        store = createStore(combineReducers({players}));
    })

    it('should return a position', () => {
        const position = { position: {x: 1, y: 1}, animation: 'left' }
        const expectedAction = {
            type: 'UPDATE_POSITION',
            positionData: {
                position: {x: 1, y: 1},
                animation: 'left'
            }
        }
        expect(store.dispatch(players.updatePosition(position))).to.be.deep.equal(expectedAction);
    })
})