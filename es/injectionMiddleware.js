'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _ActionTypes = require('./ActionTypes');

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var injectionMiddleware = function injectionMiddleware(getStore) {
	return function () {
		return function (next) {
			return function (action) {
				switch (action.type) {
					case _ActionTypes2.default.INJECT_REDUCERS:
						getStore().injectReducers(action.payload);
					case _ActionTypes2.default.REMOVE_REDUCERS:
						getStore().removeReducers(action.payload);
						break;
					case _ActionTypes2.default.INJECT_SAGA:
						getStore().injectSaga(action.payload);
						break;
					case _ActionTypes2.default.CANCEL_SAGA:
						getStore().cancelSaga(action.payload);
				}

				return next(action);
			};
		};
	};
};

exports.default = injectionMiddleware;