import React, { useEffect } from 'react';
import { StyleSheet, Text, Animated } from 'react-native';
import { useSelector } from 'react-redux';
import { uiIsNotifySelector, uiNotifySelector } from '../../ducks/ui';

const NotifyShade: React.FC = () => {
	const animatedValue = new Animated.Value(0);
	const isNotify = useSelector(uiIsNotifySelector);
	const notify = useSelector(uiNotifySelector);

	useEffect(() => {
		showShade();
	}, [isNotify]);

	const showShade = (): void => {
		animatedValue.setValue(0);
		Animated.timing(animatedValue, {
			toValue: 1,
			duration: 1000,
		}).start();
	};

	let height: Animated.AnimatedInterpolation | number = 0;
	if (isNotify) {
		height = animatedValue.interpolate({
			inputRange: [0, 1],
			outputRange: [0, 40],
		});
	} else if (notify !== '') {
		height = animatedValue.interpolate({
			inputRange: [0, 1],
			outputRange: [40, 0],
		});
	}

	return (
		<Animated.View style={[styles.content, { height: height }]}>
			<Text style={styles.text}>{notify}</Text>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	content: {
		backgroundColor: '#cc0000',
		alignItems: 'center',
		justifyContent: 'center',
		height: 0,
	},
	text: {
		color: '#fff',
	},
});

export default NotifyShade;
