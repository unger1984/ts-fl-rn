import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, FlatList, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../shared/Header';
import { getProjectsList, projectsListSelector } from '../../ducks/projects';
import Project from '../../models/Project';
import ProjectItem from './ProjectItem';
import { uiPreloaderSelector } from '../../ducks/ui';

const ProjectsScene: React.FC = () => {
	const listRef = useRef<FlatList<Project>>(null);
	const [isRefresh, setRefresh] = useState<boolean>(false);
	const dispatch = useDispatch();
	const list = useSelector(projectsListSelector);
	const preloader = useSelector(uiPreloaderSelector);

	useEffect(() => {
		dispatch(getProjectsList());
	}, []);

	// погасим индикатор обновлялки если включен
	useEffect(() => {
		if (!preloader && isRefresh) {
			setRefresh(false);
		}
	}, [preloader]);

	const handleListScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {

	};

	const handleEndReached = () => {};

	const handleRefresh = () => {
		setRefresh(true);
		dispatch(getProjectsList(1));
	};

	return (
		<View style={styles.container}>
			<FlatList
				onScroll={handleListScroll}
				style={{ flex: 1 }}
				data={list}
				keyExtractor={(item: Project) => `${item.id}`}
				renderItem={({ item, index }) => <ProjectItem item={item} index={index} />}
				initialNumToRender={20}
				onEndReached={handleEndReached}
				onRefresh={handleRefresh}
				refreshing={isRefresh}
				ref={listRef}
			/>
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
