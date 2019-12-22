import { createSelector } from 'reselect';
import { AnyAction } from 'redux';

/**
 * Constants
 **/
export const moduleName = 'settings';

export const FETCH = `${moduleName}/FETCH`;
export const SET_AUTO = `${moduleName}/SET_AUTO`;
export const SET_INTERVAL = `${moduleName}/SET_INTERVAL`;
export const SET_CATEGORY = `${moduleName}/SET_CATEGORY`;
export const SET_ALL_CATEGORY = `${moduleName}/SET_ALL_CATEGORY`;
export const SET_FONT_SIZE = `${moduleName}/SET_FONT_SIZE`;
export const SET_FULL_SCREEN = `${moduleName}/SET_FULL_SCREEN`;
export const SET_KEEP_ALIVE = `${moduleName}/SET_KEEP_ALIVE`;
export const SET_ANIMATE = `${moduleName}/SET_ANIMATE`;
export const SET_BEEP = `${moduleName}/SET_BEEP`;
export const SET_VOLUME = `${moduleName}/SET_VOLUME`;

export interface SettingsState {
	isAuto: boolean;
	interval: number;
	categoryes: number[];
	allCategory: boolean;
	fontSize: number;
	fullscreen: boolean;
	keepalive: boolean;
	animate: boolean;
	beep: boolean;
	volume: number;
}

export interface SettingsAction extends AnyAction {
	readonly type: string;
	readonly payload: {
		isAuto?: boolean;
		interval?: number;
		categoryes?: number[];
		categoryId?: number;
		allCategory?: boolean;
		fontSize?: number;
		fullscreen?: boolean;
		keepalive?: boolean;
		animate?: boolean;
		beep?: boolean;
		volume?: number;
	};
}

export const initialState: SettingsState = {
	isAuto: false,
	interval: 10,
	categoryes: [],
	allCategory: true,
	fontSize: -1,
	fullscreen: false,
	keepalive: false,
	animate: false,
	beep: false,
	volume: 99,
};

/**
 * Reducer
 */
export default (state: SettingsState = initialState, action: SettingsAction): SettingsState => {
	const { type, payload } = action;

	switch (type) {
		case FETCH:
			return { ...state, ...payload };
		case SET_AUTO:
			return { ...state, isAuto: payload.isAuto || false };
		case SET_INTERVAL:
			return { ...state, interval: payload.interval || 10 };
		case SET_CATEGORY: {
			const categoryes = [...state.categoryes];
			if (categoryes.indexOf(payload.categoryId!) >= 0) {
				categoryes.splice(categoryes.indexOf(payload.categoryId!), 1);
			} else {
				categoryes.push(payload.categoryId!);
			}
			return { ...state, categoryes };
		}
		case SET_ALL_CATEGORY:
			return {
				...state,
				categoryes: payload.allCategory ? [] : state.categoryes,
				allCategory: payload.allCategory || false,
			};
		case SET_FONT_SIZE:
			return { ...state, fontSize: payload.fontSize || -1 };
		case SET_FULL_SCREEN:
			return { ...state, fullscreen: payload.fullscreen || false };
		case SET_KEEP_ALIVE:
			return { ...state, keepalive: payload.keepalive || false };
		case SET_ANIMATE:
			return { ...state, animate: payload.animate || false };
		case SET_BEEP:
			return { ...state, beep: payload.beep || false };
		case SET_VOLUME:
			return { ...state, volume: payload.volume || 0 };
		default:
			return state;
	}
};

/**
 * Action Creators
 **/
export const fetchSettings = (payload: SettingsState): SettingsAction => ({
	type: FETCH,
	payload: payload,
});

export const setAuto = (isAuto: boolean): SettingsAction => ({
	type: SET_AUTO,
	payload: { isAuto },
});

export const editInterval = (interval: number): SettingsAction => ({
	type: SET_INTERVAL,
	payload: { interval },
});

export const setCategory = (categoryId: number): SettingsAction => ({
	type: SET_CATEGORY,
	payload: { categoryId },
});

export const setAllCategory = (allCategory: boolean): SettingsAction => ({
	type: SET_ALL_CATEGORY,
	payload: { allCategory },
});

export const setFontSize = (fontSize: number): SettingsAction => ({
	type: SET_FONT_SIZE,
	payload: { fontSize },
});

export const setFullScreen = (fullscreen: boolean): SettingsAction => ({
	type: SET_FULL_SCREEN,
	payload: { fullscreen },
});

export const setKeepAlive = (keepalive: boolean): SettingsAction => ({
	type: SET_KEEP_ALIVE,
	payload: { keepalive },
});

export const setAnimate = (animate: boolean): SettingsAction => ({
	type: SET_ANIMATE,
	payload: { animate },
});

export const setBeep = (beep: boolean): SettingsAction => ({
	type: SET_BEEP,
	payload: { beep },
});

export const setVolume = (volume: number): SettingsAction => ({
	type: SET_VOLUME,
	payload: { volume },
});

/**
 * Selectors
 **/
export const settingsSelector = (state: { settings: SettingsState }): SettingsState => state.settings;
export const settionsAutoSelector = createSelector(settingsSelector, settings => settings.isAuto);
export const settingsIntervalSelector = createSelector(settingsSelector, settings => settings.interval);
export const settingsCategoryesSelector = createSelector(settingsSelector, settings => settings.categoryes);
export const settingsAllCategorySelector = createSelector(settingsSelector, settings => settings.allCategory);
export const settingsFontSizeSelector = createSelector(settingsSelector, settings => settings.fontSize);
export const settingsFullScreenSelector = createSelector(settingsSelector, settings => settings.fullscreen);
export const settingsKeepAliveSelector = createSelector(settingsSelector, settings => settings.keepalive);
export const settingsAnimateSelector = createSelector(settingsSelector, settings => settings.animate);
export const settingsBeepSelector = createSelector(settingsSelector, settings => settings.beep);
export const settingsVolumeSelector = createSelector(settingsSelector, settings => settings.volume);
