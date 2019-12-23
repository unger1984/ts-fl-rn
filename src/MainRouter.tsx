import React, { useEffect } from 'react';
import { createAppContainer, NavigationScreenConfig } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator, NavigationStackScreenComponent } from 'react-navigation-stack';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import SettingsScene from './components/SettingsScene';
import { SettingsProvider } from './components/shared/SettingsContext';
import { settingsSelector } from './ducks/settings';
import colors from './const/colors';
import TabBarIcon from './components/common/TabBarIcon';
import ProjectsScene from './components/ProjectsScene/ProjectsScene';
import FiltersScene from './components/FilterScene/FiltersScene';
import { getProjectsList } from './ducks/projects';
import ProjectOneScene from './components/ProjectsScene/ProjectOneScene';
import Header from './components/shared/Header';
import { HeaderProps } from 'react-navigation-stack/src/types';

const ProjectStack: NavigationStackScreenComponent = createStackNavigator(
	{
		ProjectsList: ProjectsScene,
		ProjectOne: ProjectOneScene,
	},
	{
		defaultNavigationOptions: ({ navigation }) => ({
			// eslint-disable-next-line react/display-name
			header: (props: HeaderProps) => (
				<Header title={'test'} isBack={navigation.state.routeName !== 'ProjectsList'} navigation={navigation} />
			),
		}),
	},
);

ProjectStack.navigationOptions = ({ navigation }): NavigationScreenConfig<any, any> => ({
	tabBarVisible: navigation.state.index === 0,
});

const TabNavigator = createBottomTabNavigator(
	{
		Projects: ProjectStack,
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
	const dispatch = useDispatch();
	const settings = useSelector(settingsSelector, shallowEqual);
	const { interval, isAuto } = settings;

	useEffect(() => {
		let idle: any | null = null;
		if (isAuto) {
			idle = setInterval(() => {
				dispatch(getProjectsList());
			}, interval * 1000);
		}
		return (): void => {
			if (idle) {
				clearInterval(idle);
			}
		};
	}, [isAuto]);

	return (
		<SettingsProvider value={settings}>
			<RootNavigator />
		</SettingsProvider>
	);
};

export default MainRouter;
