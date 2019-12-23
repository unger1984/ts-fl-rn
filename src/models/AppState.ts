import { UIState } from '../ducks/ui';
import { SettingsState } from '../ducks/settings';
import { CategoryesState } from '../ducks/categoryes';
import { ProjectsState } from '../ducks/projects';

export default interface AppState {
	ui?: UIState;
	settings?: SettingsState;
	category?: CategoryesState;
	projects?: ProjectsState;
}
