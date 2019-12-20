import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { shallowEqual, useSelector } from 'react-redux';

import SettingsScene from './components/SettingsScene';
import { SettingsProvider } from './components/shared/SettingsContext';
import { settingsSelector } from './ducks/settings';
import colors from './const/colors';
import TabBarIcon from './components/common/TabBarIcon';
import ProjectsScene from './components/ProjectsScene';
import FiltersScene from './components/FiltersScene';

const TabNavigator = createBottomTabNavigator(
	{
		Projects: ProjectsScene,
		Filter: FiltersScene,
		Settings: SettingsScene,
	},
	{
		defaultNavigationOptions: ({ navigation }) => ({
			// eslint-disable-next-line react/display-name
			tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} navigation={navigation} />,
		}),
		tabBarOptions: {
			showLabel: false,
			style: {
				backgroundColor: colors.btnBackgroundColor,
			},
		},
	},
);

const RootNavigator = createAppContainer(TabNavigator);

const MainRouter: React.FC = () => {
	const settings = useSelector(settingsSelector, shallowEqual);
	return (
		<SettingsProvider value={settings}>
			<RootNavigator />
		</SettingsProvider>
	);
};

export default MainRouter;
