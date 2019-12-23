import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native';
import { useSelector } from 'react-redux';
import { withNavigation } from 'react-navigation';

import Project from '../../models/Project';
import { settingsAnimateSelector } from '../../ducks/settings';
import SettingsContext from '../shared/SettingsContext';
import { dateToString, flTextPreiew } from '../../helpers';

const ProjectItem: React.FC<{
	item: Project;
	index: number;
	navigation: { push: (route: string, opts: any) => void };
}> = ({ item, index, navigation }) => {
	const animate = useSelector(settingsAnimateSelector);
	const { fontSize } = useContext(SettingsContext);
	const animatedValue = new Animated.Value(0);

	const { isNew, date, title, price, text } = item;

	let backgroundColorVar: string | Animated.AnimatedInterpolation = '#fff';
	if (animate && isNew) {
		backgroundColorVar = animatedValue.interpolate({
			inputRange: [0, 0.2, 1],
			outputRange: ['#6ec445', '#6ec445', '#fff'],
		});
	}

	const handlePress = () => {
		navigation.push('ProjectOne', { tabBarVisible: true });
	};

	return (
		<Animated.View style={{ backgroundColor: backgroundColorVar }}>
			<TouchableOpacity style={styles.row} onPress={handlePress}>
				<View style={styles.title}>
					<Text style={[styles.titleText, { fontSize: 24 + fontSize }]}>{title}</Text>
					<View style={[styles.col, styles.right]}>
						<Text style={[styles.priceText, { fontSize: 16 + fontSize }]}>{dateToString(date)}</Text>
						<Text style={[styles.priceText, { fontSize: 16 + fontSize }]}>{price}</Text>
					</View>
				</View>
				{text && (
					<Text numberOfLines={3} style={[styles.text, { fontSize: 18 + fontSize }]}>
						{flTextPreiew(text)}
					</Text>
				)}
			</TouchableOpacity>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	row: {
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
	},
	col: {
		flexDirection: 'column',
	},
	right: {
		alignItems: 'flex-end',
		justifyContent: 'flex-start',
	},
	title: {
		flexDirection: 'row',
		padding: 10,
	},
	titleText: {
		flex: 1,
		color: '#000',
		fontSize: 24,
	},
	priceText: {
		color: '#303030',
		fontSize: 16,
	},
	text: {
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 10,
		color: '#154169',
		fontSize: 18,
	},
});

export default withNavigation(ProjectItem);
