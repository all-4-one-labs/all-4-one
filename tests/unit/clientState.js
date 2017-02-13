import players, { receiveServerPlayer, updatePosition, survivorFire, updateHealth, updatePlayerType } from '../../browser/reducers/players.js';
import game, { updateTime, endGame } from '../../browser/reducers/game.js';
import gameMode, { receiveGameMode } from '../../browser/reducers/gameMode.js';
import monsters, { updateMonsters } from '../../browser/reducers/monsters.js';
import shallowMonsters, { receiveMonsterData } from '../../browser/reducers/shallowMonsters.js';
import { expect } from 'chai';
import { createStore } from 'redux';

//redux

describe('Redux architecture for client state', () => {
    describe('action creators for players', () => {
        it('receiveServerPlayer', () => {
            let playerState = {
                player: {
                    id: 1,
                    health: 100
                }
            }
            expect(receiveServerPlayer(playerState)).to.be.deep.equal({
                type: 'RECEIVE_SERVER_PLAYER',
                serverPlayer: playerState
            });
        })

        it('updatePosition', () => {
            let position = {
                position: {
                    x: 1,
                    y: 1
                },
                animation: 'left'
            }
            expect(updatePosition(position)).to.be.deep.equal({
                type: 'UPDATE_POSITION',
                positionData: position
            })
        })

        it('survivorFire', () => {
            let survivorFireData = {
                fire: 145,
                rate: 1000
            }
            expect(survivorFire(survivorFireData)).to.be.deep.equal({
                type: 'SURVIVOR_FIRE',
                fireData: survivorFireData
            })
        })

        it('updateHealth', () => {
            let newHealth = {
                health: 100
            }
            expect(updateHealth(newHealth)).to.be.deep.equal({
                type: 'UPDATE_HEALTH',
                health: newHealth
            })
        })

        it('updatePlayerType', () => {
            let playerType = {
                playerType: 'mage'
            }
            expect(updatePlayerType(playerType)).to.be.deep.equal({
                type: 'UPDATE_PLAYER_TYPE',
                playerType: playerType
            })
        })
    })

    describe('store/reducer for players', () => {
        let testingStore;

        beforeEach('create testing store', () => {
            testingStore = createStore(players);
        })

        it('has no state to start', () => {
            let currentState = testingStore.getState();
            expect(currentState).to.be.deep.equal({});
        })

        describe('reducing on receiveServerPlayer', () => {
            it('updates player data and returns a new state', () => {
                let currentState = testingStore.getState();
                let playerState = {
                    player: {
                        id: 1,
                        health: 100
                    }
                }
                testingStore.dispatch(receiveServerPlayer(playerState));
                let newState = testingStore.getState();
                expect(newState).to.be.deep.equal(playerState);
                expect(currentState).to.not.be.deep.equal(newState);
            })
        })

        describe('reducing on updatePosition', () => {
            it('updates state with new position and returns a new state', () => {
                let currentState = testingStore.getState();
                let position = {
                    position: {
                        x: 1,
                        y: 1
                    },
                    animation: 'left'
                }
                testingStore.dispatch(updatePosition(position));
                let newState = testingStore.getState();
                expect(newState).to.be.deep.equal(position);
                expect(currentState).to.not.be.deep.equal(newState);
            })
        })

        describe('reducing on survivorFire', () => {
            it('updates state with fire data and returns a new state', () => {
                let currentState = testingStore.getState();
                 let survivorFireData = {
                    fire: 145,
                    rate: 1000
                }
                testingStore.dispatch(survivorFire(survivorFireData));
                let newState = testingStore.getState();
                expect(newState).to.be.deep.equal(survivorFireData);
                expect(currentState).to.not.be.deep.equal(newState);
            })
        })

        describe('reducing on updateHealth', () => {
            it('updates state with new health data and returns a new state', () => {
                let currentState = testingStore.getState();
                let newHealth = {
                    health: 100
                }
                testingStore.dispatch(updateHealth(newHealth));
                let newState = testingStore.getState();
                expect(newState).to.be.deep.equal(newHealth);
                expect(currentState).to.not.be.deep.equal(newState);
            })
        })

        describe('reducing on updatePlayerType', () => {
            it('updates state with new player type and returns a new state', () => {
                let currentState = testingStore.getState();
                let playerType = {
                    playerType: 'mage'
                }
                testingStore.dispatch(updatePlayerType(playerType));
                let newState = testingStore.getState();
                expect(newState).to.be.deep.equal(playerType);
                expect(currentState).to.not.be.deep.equal(newState);
            })
        })
    })

    describe('action creators for game', () => {
        it('updateTime', () => {
            let time = {
                minutes: '04',
                seconds: 53
            }
            expect(updateTime(time.minutes, time.seconds)).to.be.deep.equal({
                type: 'UPDATE_TIME',
                minutes: time.minutes,
                seconds: time.seconds
            });
        })

        it('endGame', () => {
            let text = 'SURVIVORS WIN';
            expect(endGame(text)).to.be.deep.equal({
                type: 'END_GAME',
                data: text
            })
        })
    })

    describe('store/reducer for game', () => {
        let testingStore;

        beforeEach('create testing store', () => {
            testingStore = createStore(game);
        })

        it('has an initial state consisting of time and timeUp', () => {
            let currentState = testingStore.getState();
            expect(currentState).to.be.deep.equal({
                time: '10:00',
                timeUp: false
            });
        })

        describe('reducing on updateTime', () => {
            it('updates state with new time and returns a new state', () => {
                let currentState = testingStore.getState();
                let time = {
                    minutes: '04',
                    seconds: 53
                }
                testingStore.dispatch(updateTime(time.minutes, time.seconds));
                let newState = testingStore.getState();
                expect(newState).to.be.deep.equal({
                    time: '04:53',
                    timeUp: false
                });
                expect(currentState).to.not.be.deep.equal(newState);
            })
        })

        describe('reducing on endGame', () => {
            it('updates game message and returns a new state', () => {
                let currentState = testingStore.getState();
                let text = 'SURVIVORS WIN';
                testingStore.dispatch(endGame(text));
                let newState = testingStore.getState();
                expect(newState).to.be.deep.equal({
                    time: '10:00',
                    timeUp: false,
                    win: 'SURVIVORS WIN'
                });
                expect(currentState).to.not.be.deep.equal(newState);
            })
        })
    })

    describe('action creators for gameMode', () => {
        it('receiveGameMode', () => {
            let mode = 'survivor'
            expect(receiveGameMode(mode)).to.be.deep.equal({
                type: 'RECEIVE_GAMEMODE',
                gamemode: mode
            });
        })
    })

    describe('store/reducer for gameMode', () => {
        let testingStore;

        beforeEach('create testing store', () => {
            testingStore = createStore(gameMode);
        })

        it('has an initial state of empty string', () => {
            let currentState = testingStore.getState();
            expect(currentState).to.be.deep.equal('');
        })

        describe('reducing on receiveGameMode', () => {
            it('updates state with new game mode and returns a new state', () => {
                let currentState = testingStore.getState();
                let mode = 'survivor';
                testingStore.dispatch(receiveGameMode(mode));
                let newState = testingStore.getState();
                expect(newState).to.be.deep.equal(mode);
                expect(currentState).to.not.be.deep.equal(newState);
            })
        })
    })

    describe('action creators for monsters', () => {
        it('updateMonsters', () => {
            let monsterObject = {
                1: {
                    health: 100,
                    x: 50,
                    y: 50,
                    animation: 'idle',
                    name: 'slimeB'
                    }
            }
            expect(updateMonsters(monsterObject)).to.be.deep.equal({
                type: 'UPDATE_MONSTERS',
                monsterObject: monsterObject
            });
        })
    })

    describe('store/reducer for monsters', () => {
        let testingStore;

        beforeEach('create testing store', () => {
            testingStore = createStore(monsters);
        })

        it('has an initial state of empty object', () => {
            let currentState = testingStore.getState();
            expect(currentState).to.be.deep.equal({});
        })

        describe('reducing on updateMonsters', () => {
            it('updates state with new monsters object and returns a new state', () => {
                let currentState = testingStore.getState();
                let monsterObject = {
                    1: {
                        health: 100,
                        x: 50,
                        y: 50,
                        animation: 'idle',
                        name: 'slimeB'
                    },
                    2: {
                        health: 50,
                        x: 100,
                        y: 100,
                        animation: 'left',
                        name: 'lurkerC'
                    }
                }
                testingStore.dispatch(updateMonsters(monsterObject));
                let newState = testingStore.getState();
                expect(newState).to.be.deep.equal(monsterObject);
                expect(currentState).to.not.be.deep.equal(newState);
            })
        })
    })

    describe('action creators for shallowMonsters', () => {
        it('receiveMonsterData', () => {
            let monsterObject = {
                1: {
                    health: 100,
                    x: 50,
                    y: 50,
                    animation: 'idle',
                    name: 'slimeB'
                    }
            }
            expect(receiveMonsterData(monsterObject)).to.be.deep.equal({
                type: 'RECEIVE_MONSTER_DATA',
                data: monsterObject
            });
        })
    })

    describe('store/reducer for shallowMonsters', () => {
        let testingStore;

        beforeEach('create testing store', () => {
            testingStore = createStore(shallowMonsters);
        })

        it('has an initial state of empty object', () => {
            let currentState = testingStore.getState();
            expect(currentState).to.be.deep.equal({});
        })

        describe('reducing on updateMonsters', () => {
            it('updates state with new monsters object and returns a new state', () => {
                let currentState = testingStore.getState();
                let monsterObject = {
                    1: {
                        health: 100,
                        x: 50,
                        y: 50,
                        animation: 'idle',
                        name: 'slimeB'
                    },
                    2: {
                        health: 50,
                        x: 100,
                        y: 100,
                        animation: 'left',
                        name: 'lurkerC'
                    }
                }
                testingStore.dispatch(receiveMonsterData(monsterObject));
                let newState = testingStore.getState();
                expect(newState).to.be.deep.equal(monsterObject);
                expect(currentState).to.not.be.deep.equal(newState);
            })
        })
    })
})