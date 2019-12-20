import { combineReducers, Reducer } from 'redux';

import ui from '../ducks/ui';
import categoryes from '../ducks/categoryes';
import settings from '../ducks/settings';

const createRootReducer = (): Reducer =>
	combineReducers({
		ui,
		categoryes,
		settings,
	});

export default createRootReducer;
