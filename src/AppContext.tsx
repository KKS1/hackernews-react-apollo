import React, { createContext } from "react";

export interface appStateInterface {
  token?: string,
};

export type AppContextType = {
  appState: appStateInterface,
  setAppState: (appState: appStateInterface) => void,
}

const AppContext = createContext<AppContextType>({
  appState: {},
  setAppState: () => {},
});

export default AppContext;
