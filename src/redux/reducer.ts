import { combineReducers, Reducer } from 'redux';

import ui from '../ducks/ui';

const createRootReducer = (): Reducer =>
	combineReducers({
		ui,
	});

export default createRootReducer;
