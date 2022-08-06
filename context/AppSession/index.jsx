import { createContext, useContext } from "react";
import { withSession } from "./services/middlewares";

const context = {};

const AppSessionContext = createContext(context);

export function AppSessionContextProvider({ children, context }) {
  return (
    <AppSessionContext.Provider value={context}>
      {children}
    </AppSessionContext.Provider>
  );
}

export const useAppSessionContext = () => useContext(AppSessionContext);

export { withSession };
