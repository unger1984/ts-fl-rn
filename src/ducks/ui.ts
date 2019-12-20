import { createSelector } from 'reselect';
import { AnyAction } from 'redux';

/**
 * Constants
 **/
export const moduleName = 'ui';

export const SET_PRELOADER = `${moduleName}/SET_PRELOADER`;
export const SET_ADMOB_COUNTER = `${moduleName}/SET_ADMOB_COUNTER`;
export const SET_NOTIFY = `${moduleName}/SET_NOTIFY`;

export interface UIState {
	isPreloader: boolean;
	admobCounter: number;
	isNotify: boolean;
	notify: string;
}

export interface UIAction extends AnyAction {
	readonly type: string;
	readonly payload: {
		preloader?: boolean;
		admobCounter?: number;
		isNotify?: boolean;
		notify?: string;
	};
}

const initialState: UIState = {
	isPreloader: false,
	admobCounter: 0,
	isNotify: false,
	notify: '',
};

/**
 * Reducer
 **/
export default (state: UIState = initialState, action: UIAction): UIState => {
	const { type, payload } = action;

	switch (type) {
		case SET_PRELOADER:
			return { ...state, isPreloader: payload.preloader || false };
		case SET_ADMOB_COUNTER:
			return { ...state, admobCounter: payload.admobCounter || 0 };
		case SET_NOTIFY:
			return { ...state, isNotify: payload.isNotify || false, notify: payload.notify || '' };
		default:
			return { ...state };
	}
};

/**
 * Action Creators
 **/
export const setPreloader = (preloader: boolean): UIAction => ({
	type: SET_PRELOADER,
	payload: { preloader },
});

export const setAdmobCounter = (admobCounter: number): UIAction => ({
	type: SET_ADMOB_COUNTER,
	payload: { admobCounter },
});

export const setNotify = (isNotify: boolean, notify?: string): UIAction => ({
	type: SET_NOTIFY,
	payload: { isNotify, notify },
});

/**
 * Selectors
 **/
export const uiSelector = (state: { ui: UIState }): UIState => state.ui;
export const uiPreloaderSelector = createSelector(uiSelector, (ui: UIState) => ui.isPreloader);
export const uiAdmobCounterSelector = createSelector(uiSelector, ui => ui.admobCounter);
export const uiIsNotifySelector = createSelector(uiSelector, ui => ui.isNotify);
export const uiNotifySelector = createSelector(uiSelector, ui => ui.notify);
