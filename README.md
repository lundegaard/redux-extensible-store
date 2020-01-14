# Deprecated and not maintaned. See https://github.com/lundegaard/redux-tools as a replacement!

# redux-extensible-store

Redux extension that allows you to dynamically inject new reducers and sagas into you running application.

## Why?

If you are using dynamic imports or some kind of a code splitting then you probably need to register new reducers and sagas at the time your JS chunk is loaded. So what does this module provides? We call these ad-hoc loaded modules a widgets.

* `createExtensibleStore` function that returns redux store that is able to dynamically inject reducers and sagas
* `injectReducers` redux action that allows you to extend your existing store with new reducers
* `injectSaga` redux action that allows you to run new saga, for example when your component mounts
* `cancelSaga` redux action that allows you to cancel running saga, for example when you component unmounts

## Installation

> NPM

```bash
npm install --save redux-extensible-store
```

> YARN

```bash
yarn add redux-extensible-store
```

## Usage

__To create a store:__

```js
import { createExtensibleStore } from 'redux-extensible-store'

const store = createExtensibleStore(
  preloadedState,
  { sagaMiddleware, thunkMiddleware, apiMiddleware },
  composeEnhancers
)
```

`createExtensibleStore` function takes 3 __optional__ arguments:

   * `preloadedState`: an initial redux state
   * `middlewares`: an object containing optional middlewares, when using sagas be carefull to name the necessary middleware as a _sagaMiddleware_
   * `composeEnhancers`: you might want to use `window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})` function for development environment, if not you don't need to specify that argument

__To inject reducers and sagas in your Root component that is dynamically imported in you application__
```js
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { injectReducers, injectSaga, cancelSaga } from 'redux-extensible-store'

import reducers from '../reducers'
import rootSaga from '../sagas'

const widgetSagaKey = 'MyComponent/RootSaga'

class MyComponent extends Component {
	static propTypes = {
		cancelSaga: PropTypes.func,
		injectReducers: PropTypes.func,
		injectSaga: PropTypes.func,
	}

	componentWillMount() {
		this.props.injectReducers(reducers)
		this.props.injectSaga({ key: widgetSagaKey, saga: rootSaga })
	}

	componentWillUnmount() {
		this.props.cancelSaga(widgetSagaKey)
	}

	render() {
		return (
			<div>
				<h2>My dynmically imported component</h2>
			</div>
		)
	}
}

export default connect(undefined, {
	injectReducers,
	injectSaga,
	cancelSaga,
})(MyComponent)
```

Availabe redux actions:
`injectReducers`: takes one function argument which is a map of reducers
`injectSaga`: takes one function argument which is saga definition object with this structure -> `{ key: uniqueSagaKey, saga: youWidgetRootSaga }`
`cancelSaga`: takes one function argument which is a uniqueSagaKey of type string


## Examples
See real world example of [react-union](https://github.com/lundegaard/react-union) project.

## License

MIT
