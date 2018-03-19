import { injectReducers, removeReducers, injectSaga, cancelSaga } from '../src/actions';
import ActionTypes from '../src/ActionTypes';

describe('Test action structure', () => {
	const dummyReducer = (state) => state;
	const sagaDescriptor = { key: 'DummyWidget/DummySaga', saga: {} };

	it('injectReducers has proper structure', () => {
		const reducers = { dummy: dummyReducer };

		expect(injectReducers(reducers)).toEqual({
			type: ActionTypes.INJECT_REDUCERS,
			payload: reducers,
		});
	});

	it('removeReducers has proper structure', () => {
		expect(removeReducers(['a'])).toEqual({
			type: ActionTypes.REMOVE_REDUCERS,
			payload: ['a'],
		});
	});

	it('injectReducers has proper structure', () => {
		expect(injectSaga(sagaDescriptor)).toEqual({
			type: ActionTypes.INJECT_SAGA,
			payload: sagaDescriptor,
		});
	});

	it('injectReducers has proper structure', () => {
		expect(cancelSaga(sagaDescriptor.key)).toEqual({
			type: ActionTypes.CANCEL_SAGA,
			payload: sagaDescriptor.key,
		});
	});
});
