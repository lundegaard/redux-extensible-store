import injectionMiddleware from '../src/injectionMiddleware';
import ActionTypes from '../src/ActionTypes';

const create = () => {
	const store = {
		getState: jest.fn(() => ({})),
		dispatch: jest.fn(),
		injectReducers: jest.fn(() => {}),
		injectSaga: jest.fn(() => {}),
		cancelSaga: jest.fn(() => {}),
		removeReducers: jest.fn(() => {}),
	};

	const next = jest.fn();

	const invoke = action => injectionMiddleware(() => store)()(next)(action);

	return { store, next, invoke };
};

describe('injectionMiddleware', () => {
	const injectReducersAction = { type: ActionTypes.INJECT_REDUCERS, payload: 'dummyReducer' };
	const injectSagasAction = { type: ActionTypes.INJECT_SAGA, payload: 'dummySagaDescriptor' };
	const cancelSagaAction = { type: ActionTypes.CANCEL_SAGA, payload: 'dummySagaKey' };

	it('calls injectReducers fn on store instance when injectReducers action is invoked', () => {
		const { store, next, invoke } = create();

		invoke(injectReducersAction);

		expect(store.injectReducers).toHaveBeenCalledWith(injectReducersAction.payload);
		expect(next).toHaveBeenCalled();
	});

	it('calls injectSaga fn on store instance when injectSaga action is invoked', () => {
		const { store, next, invoke } = create();

		invoke(injectSagasAction);

		expect(store.injectSaga).toHaveBeenCalledWith(injectSagasAction.payload);
		expect(next).toHaveBeenCalled();
	});

	it('calls cancelSaga fn on store instance when cancelSaga action is invoked', () => {
		const { store, next, invoke } = create();

		invoke(cancelSagaAction);

		expect(store.cancelSaga).toHaveBeenCalledWith(cancelSagaAction.payload);
		expect(next).toHaveBeenCalled();
	});
});
