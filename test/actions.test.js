import { ACTIONS, injectReducers, injectSaga, cancelSaga } from '../src/actions';

describe('Test actions structure', () => {
  const dummyReducer = (state, action) => state;
  const sagaDescriptor = { key: 'DummyWidget/DummySaga', saga: {} };

  it('injectReducers has proper structure', () => {
    const reducers = { dummy: dummyReducer };
    expect(injectReducers(reducers)).toEqual({
      type: ACTIONS.INJECT_REDUCERS,
      payload: reducers,
    });
  });

  it('injectReducers has proper structure', () => {
    expect(injectSaga(sagaDescriptor)).toEqual({
      type: ACTIONS.INJECT_SAGA,
      payload: sagaDescriptor,
    });
  });

  it('injectReducers has proper structure', () => {
    expect(cancelSaga(sagaDescriptor.key)).toEqual({
      type: ACTIONS.CANCEL_SAGA,
      payload: sagaDescriptor.key,
    });
  });
});
