import React, { useContext } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import Category from '../../models/Category';
import images from '../../images';
import colors from '../../const/colors';
import SettingsContext from '../shared/SettingsContext';
import { setCategory, settingsCategoryesSelector } from '../../ducks/settings';

const FilterItem: React.FC<{ item: Category; subcategory?: boolean; disabled?: boolean }> = ({
	item,
	subcategory,
	disabled,
}) => {
	const { fontSize } = useContext(SettingsContext);
	const dispatch = useDispatch();
	const categoryes = useSelector(settingsCategoryesSelector, shallowEqual);
	const { id, title, child } = item;

	const isCheked = (): boolean => {
		if (disabled) return true;
		return categoryes.indexOf(id) >= 0;
	};

	const handleCheck = (): void => {
		if (!disabled) {
			dispatch(setCategory(id));
		}
	};

	return (
		<>
			<View style={styles.row}>
				<TouchableOpacity style={styles.touch} onPress={handleCheck}>
					<Text
						style={[
							styles.title,
							{ fontSize: 20 + fontSize, marginLeft: subcategory ? 30 : 0 },
							disabled ? styles.disabled : styles.enabled,
						]}
					>
						{title}:
					</Text>
					<Image
						style={[styles.ico, { width: 32 + fontSize, height: 32 + fontSize }]}
						source={
							isCheked()
								? disabled
									? images.icoCheckAllDisable
									: images.icoCheckAll
								: images.icoCheckDisable
						}
					/>
				</TouchableOpacity>
			</View>
			{child &&
				child.map(category => <FilterItem key={category.id} subcategory disabled={disabled} item={category} />)}
		</>
	);
};

const styles = StyleSheet.create({
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
	enabled: {},
	disabled: {
		color: colors.separatorColor,
	},
});

export default FilterItem;
