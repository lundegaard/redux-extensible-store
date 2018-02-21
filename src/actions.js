// action type constants
export const ACTIONS = {
	INJECT_REDUCERS: '@@injectableStore/INJECT_REDUCERS',
	INJECT_SAGA: '@@injectableStore/INJECT_SAGA',
	CANCEL_SAGA: '@@injectableStore/CANCEL_SAGA',
};

// action type definitions
export const injectReducers = reducers => ({ type: ACTIONS.INJECT_REDUCERS, payload: reducers });
export const injectSaga = sagaDescriptor => ({ type: ACTIONS.INJECT_SAGA, payload: sagaDescriptor });
export const cancelSaga = key => ({ type: ACTIONS.CANCEL_SAGA, payload: key });
