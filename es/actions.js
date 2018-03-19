'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cancelSaga = exports.injectSaga = exports.removeReducers = exports.injectReducers = undefined;

var _ActionTypes = require('./ActionTypes');

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var injectReducers = exports.injectReducers = function injectReducers(reducers) {
  return { type: _ActionTypes2.default.INJECT_REDUCERS, payload: reducers };
};
var removeReducers = exports.removeReducers = function removeReducers(reducersIds) {
  return { type: _ActionTypes2.default.REMOVE_REDUCERS, payload: reducersIds };
};
var injectSaga = exports.injectSaga = function injectSaga(sagaDescriptor) {
  return { type: _ActionTypes2.default.INJECT_SAGA, payload: sagaDescriptor };
};
var cancelSaga = exports.cancelSaga = function cancelSaga(key) {
  return { type: _ActionTypes2.default.CANCEL_SAGA, payload: key };
};