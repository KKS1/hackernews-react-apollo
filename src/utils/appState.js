import { makeVar } from '@apollo/client';
/** To show case how we can use reactive variables,
 * pretty much like context API, for managing App local state */
export const appState = makeVar({ someInfo: '' });
