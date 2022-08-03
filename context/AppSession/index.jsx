import { createContext, useContext } from "react";
import { withSessionAuth, withSessionLogin } from "./services/middlewares";

const context = {};

const AppSessionContext = createContext(context);

export function AppSessionContextProvider({ children, session }) {
  return (
    <AppSessionContext.Provider value={session}>
      {children}
    </AppSessionContext.Provider>
  );
}

export const useAppSessionContext = () => useContext(AppSessionContext);

export { withSessionAuth, withSessionLogin };
