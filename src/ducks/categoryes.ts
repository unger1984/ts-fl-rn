import { createSelector } from 'reselect';
import { AnyAction, Dispatch } from 'redux';

import api from '../api';
import ApiResponseInterface from '../models/ApiResponseInterface';
import Category from '../models/Category';

/**
 * Constants
 **/
export const moduleName = 'categoryes';

export const FETCH = `${moduleName}/FETCH`;

export interface CategoryesState {
	list: Category[];
}

export interface CategoryesAction extends AnyAction {
	readonly type: string;
	readonly payload: {
		list: Category[];
	};
}

const initialState: CategoryesState = {
	list: [],
};

/**
 * Reducer
 **/
export default (state: CategoryesState = initialState, action: CategoryesAction): CategoryesState => {
	const { type, payload } = action;

	switch (type) {
		case FETCH:
			return { ...state, list: payload.list || [] };
		default:
			return { ...state };
	}
};

/**
 * Action Creators
 **/
export const fetch = (list: Category[]): CategoryesAction => ({
	type: FETCH,
	payload: { list },
});

export const getCategoyesList = () => (dispatch: Dispatch): void => {
	api.categoryes
		.getCategoryes()
		.then((res: ApiResponseInterface) => {
			console.log('res', res);
			dispatch(fetch(res.data));
		})
		.catch(exc => console.trace(exc));
};

/**
 * Selectors
 **/
export const categoryesSelector = (state: { categoryes: CategoryesState }): CategoryesState => state.categoryes;
export const categoryesListSelector = createSelector(
	categoryesSelector,
	(categoryes: CategoryesState): Category[] => categoryes.list,
);
