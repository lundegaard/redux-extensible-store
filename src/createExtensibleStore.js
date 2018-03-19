import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { identity, isNil, isEmpty, o, forEach, toPairs, values } from 'ramda';
import invariant from 'invariant';
import injectionMiddleware from './injectionMiddleware';

const createReducers = asyncReducers =>
	isNil(asyncReducers) || isEmpty(asyncReducers)
		? identity
		: combineReducers({ ...asyncReducers });

const createExtensibleStore = (preloadedState, middlewares = {}, composeEnhancers = compose) => {
	const asyncReducers = {};
	const injectedSagas = {};

	const { sagaMiddleware } = middlewares;
	const middlewareArray = values(middlewares);

	const enhacers = [
		...middlewareArray,
		injectionMiddleware(() => store),
	];

	const store = createStore(
		identity,
		preloadedState,
		composeEnhancers(applyMiddleware(...enhacers))
	);

	const injectReducer = (id, asyncReducer) => {
		if (!store.asyncReducers[id]) {
			// eslint-disable-next-line no-param-reassign
			store.asyncReducers[id] = asyncReducer;
			return store.replaceReducer(createReducers(store.asyncReducers));
		}
		return store;
	};

	const injectReducers = reducers => {
		o(
			// eslint-disable-next-line no-param-reassign, no-return-assign
			forEach(([id, reducer]) => (store.asyncReducers[id] = reducer)),
			toPairs
		)(reducers);

		return store.replaceReducer(createReducers(store.asyncReducers));
	};

	const removeReducer = reducerId => {
		// eslint-disable-next-line no-param-reassign, no-return-assign
		delete store.asyncReducers[reducerId];

		return store.replaceReducer(createReducers(store.asyncReducers));
	};

	const removeReducers = reducerIds => {
		// eslint-disable-next-line no-param-reassign, no-return-assign
		forEach((id) => delete store.asyncReducers[id])(reducerIds);

		return store.replaceReducer(createReducers(store.asyncReducers));
	};

	// inject sagas identified by key
	const injectSaga = ({ key, saga }) => {
		invariant(
			!isNil(sagaMiddleware),
			'You must provide sagaMiddleware when using createExtensibleStore helper'
		);

		if (!isNil(store.injectedSagas[key]) && store.injectedSagas[key].saga === saga) {
			store.injectedSagas[key].task.cancel();
		}

		// Run new saga
		// sagaMiddleware.run(saga) method returns a Task descriptor that is cancelable.
		store.injectedSagas[key] = {
			saga,
			task: sagaMiddleware.run(saga),
		};
	};

	const cancelSaga = key => {
		if (!isNil(store.injectedSagas[key])) {
			store.injectedSagas[key].task.cancel();
			delete store.injectedSagas[key];
		}
	};

	store.asyncReducers = asyncReducers;
	store.injectReducers = injectReducers;
	store.removeReducers = removeReducers;
	store.removeReducer = removeReducer;
	store.injectReducer = injectReducer;
	store.injectedSagas = injectedSagas;
	store.injectSaga = injectSaga;
	store.cancelSaga = cancelSaga;

	return store;
};

export default createExtensibleStore;
