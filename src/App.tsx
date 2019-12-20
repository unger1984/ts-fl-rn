import React, { useEffect } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';

import colors from './const/colors';
import configureStore from './redux/configureStore';
import MainRouter from './MainRouter';

const store = configureStore();

const App: React.FC = () => {
	useEffect(() => {
		StatusBar.setHidden(true);
		SplashScreen.hide();
	}, []);

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
