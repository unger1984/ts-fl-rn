import React, { useEffect } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import KeepAwake from 'react-native-keep-awake';

import colors from './const/colors';
import configureStore from './redux/configureStore';
import MainRouter from './MainRouter';
import storage from './api/Storage';
import { fetchUI, uiSelector, UIState } from './ducks/ui';
import { fetchSettings, settingsSelector, SettingsState } from './ducks/settings';

const store = configureStore();

const initSettings = async (settings: SettingsState) => {
	StatusBar.setHidden(!!settings.fullscreen);
	if (settings.keepalive) {
		KeepAwake.activate();
	} else {
		KeepAwake.deactivate();
	}
};

const App: React.FC = () => {
	useEffect(() => {
		init();
	}, []);

	const init = async () => {
		const ui = await storage.fetchInterface();
		store.dispatch(fetchUI(ui));
		const settings = await storage.fetchSettings();
		store.dispatch(fetchSettings(settings));
		await initSettings(settings);
		store.subscribe(() => {
			const uiNew: UIState = uiSelector(store.getState());
			const settingsNew: SettingsState = settingsSelector(store.getState());
			storage.saveInterface(uiNew);
			storage.saveSettings(settingsNew);
			initSettings(settingsNew);
		});
		SplashScreen.hide();
	};

	return (
		<View style={styles.container}>
			<Provider store={store}>
				<MainRouter />
			</Provider>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.backgroundColor,
		margin: 0,
	},
});

export default App;
