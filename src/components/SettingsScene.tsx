import React from 'react';
import { StyleSheet, ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-native-slider';
import { Picker } from 'react-native-picker-dropdown';

import {
	editInterval,
	setAnimate,
	setAuto,
	setBeep,
	setFontSize,
	setFullScreen,
	setKeepAlive,
	settingsAnimateSelector,
	settingsBeepSelector,
	settingsFontSizeSelector,
	settingsFullScreenSelector,
	settingsIntervalSelector,
	settingsKeepAliveSelector,
	settingsVolumeSelector,
	settionsAutoSelector,
	setVolume,
} from '../ducks/settings';
import images from '../images';
import Header from './shared/Header';
import colors from '../const/colors';

const SettingsScene: React.FC = () => {
	const dispatch = useDispatch();
	const fontSize = useSelector(settingsFontSizeSelector);
	const isAuto = useSelector(settionsAutoSelector);
	const interval = useSelector(settingsIntervalSelector);
	const keepalive = useSelector(settingsKeepAliveSelector);
	const fullscreen = useSelector(settingsFullScreenSelector);
	const beep = useSelector(settingsBeepSelector);
	const volume = useSelector(settingsVolumeSelector);
	const animate = useSelector(settingsAnimateSelector);

	const handleSetAuto = (): void => {
		dispatch(setAuto(!isAuto));
	};

	const handleIntervalChange = (text: string): void => {
		dispatch(editInterval(parseInt(text)));
	};

	const handleChangeFont = (value: number) => {
		dispatch(setFontSize(value));
	};

	const handleKeepAliveChange = () => {
		dispatch(setKeepAlive(!keepalive));
	};

	const handleFullScreenChange = () => {
		dispatch(setFullScreen(!fullscreen));
	};

	const handleBeepChange = () => {
		dispatch(setBeep(!beep));
	};

	const handleVolumeChange = (value: number) => {
		dispatch(setVolume(value));
	};

	const handleAnimateChange = () => {
		dispatch(setAnimate(!animate));
	};

	return (
		<View style={styles.container}>
			<Header title="Настройки" />
			<ScrollView>
				<View style={styles.row}>
					<TouchableOpacity style={styles.touch} onPress={handleKeepAliveChange}>
						<Text style={[styles.title, { fontSize: 20 + fontSize }]}>Не отключать экран:</Text>
						<Image
							style={[styles.ico, { width: 32 + fontSize, height: 32 + fontSize }]}
							source={keepalive ? images.icoCheckAll : images.icoCheckDisable}
						/>
					</TouchableOpacity>
				</View>
				<View style={styles.row}>
					<TouchableOpacity style={styles.touch} onPress={handleFullScreenChange}>
						<Text style={[styles.title, { fontSize: 20 + fontSize }]}>На полный экран:</Text>
						<Image
							style={[styles.ico, { width: 32 + fontSize, height: 32 + fontSize }]}
							source={fullscreen ? images.icoCheckAll : images.icoCheckDisable}
						/>
					</TouchableOpacity>
				</View>
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
						<Picker
							selectedValue={interval}
							onValueChange={handleIntervalChange}
							prompt="Интервал обновления ленты"
							style={styles.picker}
							textStyle={[styles.pickerText, isAuto ? styles.enabled : styles.disabled]}
							enabled={isAuto}
						>
							<Picker.Item label="10 сек" value={10} />
							<Picker.Item label="20 сек" value={20} />
							<Picker.Item label="30 сек" value={30} />
							<Picker.Item label="40 сек" value={40} />
							<Picker.Item label="50 сек" value={50} />
							<Picker.Item label=" 1 мин" value={60} />
							<Picker.Item label=" 2 мин" value={120} />
							<Picker.Item label=" 5 мин" value={300} />
						</Picker>
					</View>
				)}
				<View style={styles.row}>
					<TouchableOpacity style={styles.touch} onPress={handleAnimateChange}>
						<Text style={[styles.title, { fontSize: 20 + fontSize }]}>Подсвечивать новые:</Text>
						<Image
							style={[styles.ico, { width: 32 + fontSize, height: 32 + fontSize }]}
							source={animate ? images.icoCheckAll : images.icoCheckDisable}
						/>
					</TouchableOpacity>
				</View>
				<View style={styles.row}>
					<TouchableOpacity style={styles.touch} onPress={handleBeepChange}>
						<Text style={[styles.title, { fontSize: 20 + fontSize }]}>Звуковое уведомление:</Text>
						<Image
							style={[styles.ico, { width: 32 + fontSize, height: 32 + fontSize }]}
							source={beep ? images.icoCheckAll : images.icoCheckDisable}
						/>
					</TouchableOpacity>
				</View>
				{beep && (
					<View style={styles.row}>
						<Text style={[styles.title, { fontSize: 20 + fontSize }]}>Громкость:</Text>
						<Slider
							style={{ width: 200 }}
							value={volume}
							disabled={!isAuto || !beep}
							minimumValue={0}
							maximumValue={99}
							step={1}
							minimumTrackTintColor={!isAuto || !beep ? '#ccc' : '#3f3f3f'}
							maximumTrackTintColor={'#ccc'}
							thumbTintColor={!isAuto || !beep ? '#ccc' : '#343434'}
							onValueChange={handleVolumeChange}
						/>
					</View>
				)}
				<View style={styles.row}>
					<Text style={[styles.title, { fontSize: 20 + fontSize }]}>Размеры:</Text>
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
	picker: {
		borderWidth: 1,
		borderColor: colors.separatorColor,
		marginRight: 10,
		padding: 0,
		width: 120,
	},
	pickerText: {
		color: colors.textMainColor,
	},
	enabled: {},
	disabled: {
		color: colors.separatorColor,
	},
});

export default SettingsScene;
