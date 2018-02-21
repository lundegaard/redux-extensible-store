import { ACTIONS } from './actions';

const injectionMiddleware = getStore => () => next => action => {
	switch (action.type) {
	case ACTIONS.INJECT_REDUCERS:
		getStore().injectReducers(action.payload);
		break;
	case ACTIONS.INJECT_SAGA:
		getStore().injectSaga(action.payload);
		break;
	case ACTIONS.CANCEL_SAGA:
		getStore().cancelSaga(action.payload);
	}

	return next(action);
};

export default injectionMiddleware;
