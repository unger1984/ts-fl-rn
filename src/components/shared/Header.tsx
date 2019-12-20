'use strict';

import React, { useContext } from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Text, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';

import images from '../../images';
import NotifyShade from './NotifyShade';
import { uiPreloaderSelector } from '../../ducks/ui';
import SettingsContext from './SettingsContext';

interface HeaderProps {
	title: string;
	isBack?: boolean;
	fullscreen?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, isBack, fullscreen = false }) => {
	const { fontSize } = useContext(SettingsContext);
	const isPreloader = useSelector(uiPreloaderSelector);

	const handleBack = () => {
		// Actions.pop();
	};

	return (
		<View>
			<View
				style={[
					styles.main,
					{ paddingTop: fullscreen ? 0 : 20, height: (fullscreen ? 60 : 80) + fontSize * 2 },
				]}
			>
				<View style={styles.container}>
					{isBack && (
						<TouchableOpacity onPress={handleBack} style={styles.headerButton}>
							<Image style={{ width: 20, height: 20 }} resizeMode="contain" source={images.ico_back} />
						</TouchableOpacity>
					)}
					{isPreloader && <View style={{ width: 20, height: 20, marginLeft: 10 }} />}
					<Text style={[styles.title, { fontSize: 22 + fontSize }]}>{title}</Text>
					<View style={{ width: 20, height: 20, backgroundColor: 'transparent', marginRight: 10 }} />
					{isPreloader && (
						<ActivityIndicator animating={true} color="#fff" style={{ height: 20, marginRight: 10 }} />
					)}
				</View>
			</View>
			<NotifyShade />
		</View>
	);
};

const styles = StyleSheet.create({
	main: {
		alignSelf: 'stretch',
		justifyContent: 'center',
		alignItems: 'stretch',
		backgroundColor: '#6ec445',
	},
	container: {
		backgroundColor: 'transparent',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	title: {
		textAlign: 'center',
		fontWeight: 'bold',
		color: '#fff',
		flex: 1,
		fontSize: 22,
	},
	headerButton: {
		padding: 20,
	},
});

export default Header;
