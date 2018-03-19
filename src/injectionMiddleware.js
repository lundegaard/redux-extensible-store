import ActionTypes from './ActionTypes';

const injectionMiddleware = getStore => () => next => action => {
	switch (action.type) {
	case ActionTypes.INJECT_REDUCERS:
		getStore().injectReducers(action.payload);
	case ActionTypes.REMOVE_REDUCERS:
		getStore().removeReducers(action.payload);
		break;
	case ActionTypes.INJECT_SAGA:
		getStore().injectSaga(action.payload);
		break;
	case ActionTypes.CANCEL_SAGA:
		getStore().cancelSaga(action.payload);
	}

	return next(action);
};

export default injectionMiddleware;
