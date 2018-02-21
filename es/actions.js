'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
// action type constants
var ACTIONS = exports.ACTIONS = {
	INJECT_REDUCERS: '@@injectableStore/INJECT_REDUCERS',
	INJECT_SAGA: '@@injectableStore/INJECT_SAGA',
	CANCEL_SAGA: '@@injectableStore/CANCEL_SAGA'
};

// action type definitions
var injectReducers = exports.injectReducers = function injectReducers(reducers) {
	return { type: ACTIONS.INJECT_REDUCERS, payload: reducers };
};
var injectSaga = exports.injectSaga = function injectSaga(sagaDescriptor) {
	return { type: ACTIONS.INJECT_SAGA, payload: sagaDescriptor };
};
var cancelSaga = exports.cancelSaga = function cancelSaga(key) {
	return { type: ACTIONS.CANCEL_SAGA, payload: key };
};