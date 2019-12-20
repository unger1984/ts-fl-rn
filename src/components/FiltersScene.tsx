import React from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './shared/Header';

const FiltersScene: React.FC = () => {
	return (
		<View style={styles.container}>
			<Header title="Категории" />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'stretch',
		backgroundColor: '#fff',
	},
});

export default FiltersScene;
