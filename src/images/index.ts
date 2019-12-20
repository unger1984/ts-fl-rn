import { ImageSourcePropType } from 'react-native';

const images: { [key: string]: ImageSourcePropType } = {
	icoBack: require('./ico_back.png'),

	icoProjects: require('./Projects.png'),
	icoProjectsActive: require('./projectsActive.png'),
	icoFilter: require('./filter.png'),
	icoFilterActive: require('./filterActive.png'),
	icoSettings: require('./settings.png'),
	icoSettingsActive: require('./settingsActive.png'),

	icoUp: require('./ico_up.png'),
	icoDown: require('./ico_down.png'),

	icoCheckDisable: require('./ico_check_disable.png'),
	icoCheckEnable: require('./ico_check_enable.png'),
	icoCheckAll: require('./ico_check_all.png'),
	icoCheckDisableDisable: require('./ico_check_disable_disable.png'),
	icoCheckAllDisable: require('./ico_check_all_disable.png'),
};

export default images;
