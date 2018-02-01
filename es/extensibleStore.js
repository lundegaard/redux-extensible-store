'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _redux = require('redux');

var _ramda = require('ramda');

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _injectionMiddleware = require('./injectionMiddleware');

var _injectionMiddleware2 = _interopRequireDefault(_injectionMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var createReducers = function createReducers(asyncReducers) {
	return (0, _ramda.isNil)(asyncReducers) || (0, _ramda.isEmpty)(asyncReducers) ? _ramda.identity : (0, _redux.combineReducers)(_extends({}, asyncReducers));
};

var createExtensibleStore = function createExtensibleStore(preloadedState) {
	var middlewares = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	var composeEnhancers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _redux.compose;

	var asyncReducers = {};
	var injectedSagas = {};

	var sagaMiddleware = middlewares.sagaMiddleware;

	var middlewareArray = (0, _ramda.values)(middlewares);

	var enhacers = [].concat(_toConsumableArray(middlewareArray), [(0, _injectionMiddleware2.default)(function () {
		return store;
	})]);

	var store = (0, _redux.createStore)(_ramda.identity, preloadedState, composeEnhancers(_redux.applyMiddleware.apply(undefined, _toConsumableArray(enhacers))));

	var injectReducer = function injectReducer(id, asyncReducer) {
		if (!store.asyncReducers[id]) {
			// eslint-disable-next-line no-param-reassign
			store.asyncReducers[id] = asyncReducer;
			return store.replaceReducer(createReducers(store.asyncReducers));
		}
		return store;
	};

	var injectReducers = function injectReducers(reducers) {
		(0, _ramda.o)(
		// eslint-disable-next-line no-param-reassign, no-return-assign
		(0, _ramda.map)(function (_ref) {
			var _ref2 = _slicedToArray(_ref, 2),
			    id = _ref2[0],
			    reducer = _ref2[1];

			return store.asyncReducers[id] = reducer;
		}), _ramda.toPairs)(reducers);

		return store.replaceReducer(createReducers(store.asyncReducers));
	};

	// inject sagas identified by key
	var injectSaga = function injectSaga(_ref3) {
		var key = _ref3.key,
		    saga = _ref3.saga;

		(0, _invariant2.default)(!(0, _ramda.isNil)(sagaMiddleware), 'You must provide sagaMiddleware when using extensibleStore helper');

		if (!(0, _ramda.isNil)(store.injectedSagas[key]) && store.injectedSagas[key].saga === saga) {
			store.injectedSagas[key].task.cancel();
		}

		// Run new saga
		// sagaMiddleware.run(saga) method returns a Task descriptor that is cancelable.
		store.injectedSagas[key] = {
			saga: saga,
			task: sagaMiddleware.run(saga)
		};
	};

	var cancelSaga = function cancelSaga(key) {
		if (!(0, _ramda.isNil)(store.injectedSagas[key])) {
			store.injectedSagas[key].task.cancel();
			delete store.injectedSagas[key];
		}
	};

	store.asyncReducers = asyncReducers;
	store.injectReducers = injectReducers;
	store.injectReducer = injectReducer;
	store.injectedSagas = injectedSagas;
	store.injectSaga = injectSaga;
	store.cancelSaga = cancelSaga;

	return store;
};

exports.default = createExtensibleStore;