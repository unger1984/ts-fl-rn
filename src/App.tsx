import React, { useEffect } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Router, Scene, ActionConst } from 'react-native-router-flux';
import { connect, Provider } from 'react-redux';

import colors from './const/colors';
import configureStore from './redux/configureStore';
import DashBoard from './components/DashBoard';
import TabIcon from './components/common/TabIcon';

const RouterWithRedux = connect()(Router);
const store = configureStore();

const App = () => {
	useEffect(() => {
		StatusBar.setHidden(true);
		SplashScreen.hide();
	}, []);
	return (
		<View style={styles.container}>
			<Provider store={store}>
				<RouterWithRedux>
					<Scene key="root" hideNavBar={true} hideStatusBar={true}>
						<Scene
							key="tabbar"
							tabs={true}
							showLabel={false}
							tabBarPosition="bottom"
							tabBarStyle={styles.tabbar}
							labelStyle={styles.tabbarLabel}
							activeTintColor="#fff"
							inactiveTintColor="#ccc"
							lazy={true}
							hideBackImage={true}
						>
							<Scene
								key="dashboard"
								component={DashBoard}
								type={'refresh'}
								icon={TabIcon}
								img="icoNew"
								hideNavBar={true}
								initial
							/>
							<Scene
								key="filter"
								component={DashBoard}
								type={'refresh'}
								icon={TabIcon}
								img="icoFilter"
								hideNavBar={true}
							/>
							<Scene
								key="settings"
								component={DashBoard}
								type={'refresh'}
								icon={TabIcon}
								img="icoSettings"
								hideNavBar={true}
							/>
						</Scene>
					</Scene>
				</RouterWithRedux>
			</Provider>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.backgroundColor,
		// shadowColor: null,
		// shadowOffset: null,
		// shadowOpacity: null,
		// shadowRadius: null,
		margin: 0,
	},
	tabbar: {
		backgroundColor: colors.btnBackgroundColor,
	},
	tabbarLabel: {
		fontWeight: 'bold',
	},
});

export default App;
