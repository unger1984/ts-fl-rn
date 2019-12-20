import { createContext } from 'react';
import { SettingsState, initialState } from '../../ducks/settings';

const SettingsContext: React.Context<SettingsState> = createContext(initialState);

export const SettingsProvider = SettingsContext.Provider;
export const SettingsConsumer = SettingsContext.Consumer;

export default SettingsContext;
