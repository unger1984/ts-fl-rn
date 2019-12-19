import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore, Store } from 'redux';
import createRootReducer from './reducer';

export default (initialState = {}): Store => {
	const store = createStore(createRootReducer(), initialState, compose(applyMiddleware(thunk)));

	// if (module.hot) {
	// 	Enable Webpack hot module replacement for reducers
	// module.hot.accept('./reducer', () => {
	// 	const nextRootReducer = require('./reducer');
	// 	store.replaceReducer(nextRootReducer);
	// });
	// }

	return store;
};
