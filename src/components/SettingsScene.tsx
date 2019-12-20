import React from 'react';
import { StyleSheet, ScrollView, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-native-slider';

import {
	editInterval,
	setAuto,
	setFontSize,
	settingsFontSizeSelector,
	settingsIntervalSelector,
	settionsAutoSelector,
} from '../ducks/settings';
import images from '../images';
import Header from './shared/Header';
import colors from '../const/colors';

const SettingsScene: React.FC = () => {
	const dispatch = useDispatch();
	const fontSize = useSelector(settingsFontSizeSelector);
	const isAuto = useSelector(settionsAutoSelector);
	const interval = useSelector(settingsIntervalSelector);

	const handleSetAuto = (): void => {
		dispatch(setAuto(!isAuto));
	};

	const handleIntervalChange = (text: string): void => {
		dispatch(editInterval(parseInt(text)));
	};

	const handleChangeFont = (value: number) => {
		dispatch(setFontSize(value));
	};

	return (
		<View style={styles.container}>
			<Header title="Настройки" />
			<ScrollView>
				<View style={styles.row}>
					<TouchableOpacity style={styles.touch} onPress={handleSetAuto}>
						<Text style={[styles.title, { fontSize: 20 + fontSize }]}>Автообновление:</Text>
						<Image
							style={[styles.ico, { width: 32 + fontSize, height: 32 + fontSize }]}
							source={isAuto ? images.icoCheckAll : images.icoCheckDisable}
						/>
					</TouchableOpacity>
				</View>
				{isAuto && (
					<View style={styles.row}>
						<Text style={[styles.title, { fontSize: 20 + fontSize }]}>Интервал обновления:</Text>
						<TextInput onChangeText={handleIntervalChange} />
					</View>
				)}
				<View style={styles.row}>
					<Text style={[styles.title, { fontSize: 20 + fontSize }]}>Размеры</Text>
					<Slider
						style={{ width: 200 }}
						value={fontSize}
						minimumValue={-10}
						maximumValue={10}
						step={1}
						minimumTrackTintColor={'#3f3f3f'}
						maximumTrackTintColor={'#ccc'}
						thumbTintColor={'#343434'}
						onValueChange={handleChangeFont}
					/>
				</View>
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

export default SettingsScene;
