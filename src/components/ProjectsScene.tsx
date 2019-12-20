import React from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './shared/Header';

const ProjectsScene: React.FC = () => {
	return (
		<View style={styles.container}>
			<Header title="Проекты" />
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

export default ProjectsScene;
