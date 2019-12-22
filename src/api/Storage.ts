import AsyncStorage from '@react-native-community/async-storage';

import { UIState, initialState as uiInitialState } from '../ducks/ui';
import { storageKey } from '../config';
import { SettingsState, initialState as settingsInitialState } from '../ducks/settings';

export default class Strorage {
	static async saveInterface(ui: UIState): Promise<void> {
		await AsyncStorage.setItem(`${storageKey}-ui`, JSON.stringify(ui));
	}

	static async fetchInterface(): Promise<UIState> {
		const json = await AsyncStorage.getItem(`${storageKey}-ui`);
		if (json) {
			return JSON.parse(json);
		}
		return uiInitialState;
	}

	static async saveSettings(settings: SettingsState): Promise<void> {
		await AsyncStorage.setItem(`${storageKey}-settings`, JSON.stringify(settings));
	}

	static async fetchSettings(): Promise<SettingsState> {
		const json = await AsyncStorage.getItem(`${storageKey}-settings`);
		if (json) {
			return JSON.parse(json);
		}
		return settingsInitialState;
	}
}
