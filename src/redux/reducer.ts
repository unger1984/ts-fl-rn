import { combineReducers, Reducer } from 'redux';

import ui from '../ducks/ui';
import categoryes from '../ducks/categoryes';
import settings from '../ducks/settings';
import projects from '../ducks/projects';

const createRootReducer = (): Reducer =>
	combineReducers({
		ui,
		categoryes,
		settings,
		projects,
	});

export default createRootReducer;
