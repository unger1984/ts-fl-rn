import { ImageSourcePropType } from 'react-native';

const images: { [key: string]: ImageSourcePropType } = {
	icoBack: require('./ico_back.png'),

	icoNew: require('./ico_new.png'),
	icoNewActive: require('./ico_new_active.png'),
	icoFilter: require('./ico_filter.png'),
	icoFilterActive: require('./ico_filter_active.png'),
	icoSettings: require('./ico_settings.png'),
	icoSettingsActive: require('./ico_settings_active.png'),

	icoUp: require('./ico_up.png'),
	icoDown: require('./ico_down.png'),

	icoCheckDisable: require('./ico_check_disable.png'),
	icoCheckEnable: require('./ico_check_enable.png'),
	icoCheckAll: require('./ico_check_all.png'),
	icoCheckDisableDisable: require('./ico_check_disable_disable.png'),
	icoCheckAllDisable: require('./ico_check_all_disable.png'),
};

export default images;
