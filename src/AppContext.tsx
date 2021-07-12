import React, { createContext } from "react";

export type AppContextType = {
  appState: {
    token?: string,
  },
  setAppState: (appState: object) => void,
}

const AppContext = createContext<AppContextType>({
  appState: {},
  setAppState: () => {},
});

export default AppContext;
