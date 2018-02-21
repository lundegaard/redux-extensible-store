'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _actions = require('./actions');

var injectionMiddleware = function injectionMiddleware(getStore) {
	return function () {
		return function (next) {
			return function (action) {
				switch (action.type) {
					case _actions.ACTIONS.INJECT_REDUCERS:
						getStore().injectReducers(action.payload);
						break;
					case _actions.ACTIONS.INJECT_SAGA:
						getStore().injectSaga(action.payload);
						break;
					case _actions.ACTIONS.CANCEL_SAGA:
						getStore().cancelSaga(action.payload);
				}

				return next(action);
			};
		};
	};
};

exports.default = injectionMiddleware;