import createSagaMiddleware from 'redux-saga';

import createExtensibleStore from '../src/createExtensibleStore';

describe('createExtensibleStrore without any middlewares', () => {
	const dummyReducerOne = (state) => state;
	const dummyReducerTwo = (state) => state;
	const reducers = { dummyOne: dummyReducerOne };
	const store = createExtensibleStore();

	beforeEach(() => {
		store.replaceReducer = jest.fn();
		store.asyncReducers = {};
	});

	it('provides injectReducer function', () => {
		store.injectReducer('dummyOne', dummyReducerOne);
		expect(store.asyncReducers).toEqual(reducers);
		expect(store.replaceReducer.mock.calls.length).toBe(1);
	});

	it('provides injectReducers function', () => {
		store.injectReducers(reducers);
		expect(store.asyncReducers).toEqual(reducers);
		expect(store.replaceReducer.mock.calls.length).toBe(1);
	});

	it('extends existing reducers map with injectReducer function', () => {
		store.asyncReducers = reducers;
		store.injectReducer('dummyTwo', dummyReducerTwo);
		expect(store.asyncReducers).toEqual({ ...reducers, dummyTwo: dummyReducerTwo });
		expect(store.replaceReducer.mock.calls.length).toBe(1);
	});

	it('removes reducer from under provided key', () => {
		store.asyncReducers = reducers;
		store.removeReducer('dummyOne');

		expect(store.asyncReducers.dummyOne).toBeFalsy();
	});
	it('removes reducers from under provided list of keys', () => {
		store.asyncReducers = reducers;
		store.removeReducers(['dummyOne']);

		expect(store.asyncReducers.dummyOne).toBeFalsy();
	});

	it('throws an error when injectSaga is called', () => {
		expect(() => store.injectSaga({})).toThrow(
			'You must provide sagaMiddleware when using createExtensibleStore helper'
		);
	});
});

describe('createExtensibleStrore without saga middlewares', () => {
	const store = createExtensibleStore({}, { sagaMiddleware: createSagaMiddleware() });

	function *rootSaga() {
		yield 'This is rootSaga';
	}

	const sagaDescriptor = { key: 'rootSaga', saga: rootSaga };

	beforeEach(() => {
		store.injectedSagas = {};
	});

	it('provides injectSaga function', () => {
		store.injectSaga(sagaDescriptor);
		expect(store.injectedSagas[sagaDescriptor.key]).toBeTruthy();
	});

	it('provides cancelSaga function', () => {
		const cancelableTaskFn = jest.fn();
		store.injectedSagas = { rootSaga: { saga: rootSaga, task: { cancel: cancelableTaskFn } } };
		store.cancelSaga(sagaDescriptor.key);
		expect(cancelableTaskFn.mock.calls.length).toBe(1);
		expect(store.injectedSagas[sagaDescriptor.key]).toBeFalsy();
	});

	it('injectSaga function cancel previous saga if new one is added with the same key', () => {
		const cancelableTaskFn = jest.fn();
		store.injectedSagas = { rootSaga: { saga: rootSaga, task: { cancel: cancelableTaskFn } } };
		store.injectSaga(sagaDescriptor);
		expect(cancelableTaskFn.mock.calls.length).toBe(1);
		expect(store.injectedSagas[sagaDescriptor.key]).toBeTruthy();
	});
});
