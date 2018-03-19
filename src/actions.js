import ActionTypes from './ActionTypes';

export const injectReducers = reducers => ({ type: ActionTypes.INJECT_REDUCERS, payload: reducers });
export const removeReducers = reducersIds => ({ type: ActionTypes.REMOVE_REDUCERS, payload: reducersIds });
export const injectSaga = sagaDescriptor => ({ type: ActionTypes.INJECT_SAGA, payload: sagaDescriptor });
export const cancelSaga = key => ({ type: ActionTypes.CANCEL_SAGA, payload: key });
