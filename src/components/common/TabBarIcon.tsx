import React, { useContext } from 'react';
import { StyleSheet, Image } from 'react-native';
import { NavigationState } from 'react-navigation';

import SettingsContext from '../shared/SettingsContext';
import images from '../../images';

const TabBarIcon: React.FC<{
	focused: boolean;
	navigation: { state: NavigationState };
}> = ({ focused, navigation }) => {
	const { fontSize } = useContext(SettingsContext);
	return (
		<Image
			style={[styles.icon, { width: 32 + fontSize, height: 32 + fontSize }]}
			source={images[`ico${navigation.state.key}${focused ? 'Active' : ''}`]}
		/>
	);
};

const styles = StyleSheet.create({
	icon: {
		width: 32,
		height: 32,
		resizeMode: 'contain',
	},
});

export default TabBarIcon;
