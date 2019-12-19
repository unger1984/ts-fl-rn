import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';

import images from '../../images';

interface TabIconProps {
	img: string;
	focused: boolean;
	title: string;
	fontSize: number;
}

const TabIcon: React.FC<TabIconProps> = ({ img, focused, title, fontSize = -1 }) => (
	<View style={[styles.container, { height: 32 + fontSize * 2 }]}>
		{img && (
			<Image
				style={[styles.icon, { width: 32 + fontSize, height: 32 + fontSize }]}
				source={images[img + (focused ? 'Active' : '')]}
			/>
		)}
		{title && <Text style={{ fontSize: 12 + fontSize }}>{title}</Text>}
	</View>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		alignSelf: 'stretch',
		justifyContent: 'center',
	},
	icon: {
		width: 32,
		height: 32,
		resizeMode: 'contain',
	},
});

export default TabIcon;
