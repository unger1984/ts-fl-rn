import React, { useContext, useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import Header from '../shared/Header';
import { setAllCategory, settingsAllCategorySelector } from '../../ducks/settings';
import { categoryesListSelector, getCategoyesList } from '../../ducks/categoryes';
import colors from '../../const/colors';
import SettingsContext from '../shared/SettingsContext';
import images from '../../images';
import FilterItem from './FilterItem';

const FiltersScene: React.FC = () => {
	const dispatch = useDispatch();
	const { fontSize } = useContext(SettingsContext);
	const allCategory = useSelector(settingsAllCategorySelector);
	const categoryes = useSelector(categoryesListSelector, shallowEqual);

	useEffect(() => {
		dispatch(getCategoyesList());
	}, []);

	const handleSetAllCategory = (): void => {
		dispatch(setAllCategory(!allCategory));
	};

	return (
		<View style={styles.container}>
			<Header title="Категории" />
			<ScrollView>
				<View style={styles.row}>
					<TouchableOpacity style={styles.touch} onPress={handleSetAllCategory}>
						<Text style={[styles.title, { fontSize: 20 + fontSize }]}>Все категории:</Text>
						<Image
							style={[styles.ico, { width: 32 + fontSize, height: 32 + fontSize }]}
							source={allCategory ? images.icoCheckAll : images.icoCheckDisable}
						/>
					</TouchableOpacity>
				</View>
				{categoryes.map(category => (
					<FilterItem key={category.id} disabled={allCategory} item={category} />
				))}
			</ScrollView>
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
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderBottomWidth: 1,
		borderBottomColor: colors.separatorColor,
		padding: 5,
	},
	touch: {
		flex: 1,
		flexDirection: 'row',
	},
	title: {
		flex: 1,
		fontSize: 20,
		color: '#000',
	},
	ico: {
		width: 32,
		height: 32,
		resizeMode: 'contain',
		marginRight: 10,
	},
});

export default FiltersScene;
