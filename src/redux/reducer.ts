import { combineReducers } from 'redux';

import ui from '../ducks/ui';

const createRootReducer = () =>
	combineReducers({
		ui,
	});

export default createRootReducer;
