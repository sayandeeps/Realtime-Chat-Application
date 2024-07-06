import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

interface IInitialState {
  user: null | any;
  isFetching: boolean;
  error: boolean;
}

const INITIAL_STATE: IInitialState = {
  user: null,
  isFetching: false,
  error: false,
};

interface IAuthContext {
  user: null | any;
  isFetching: boolean;
  error: boolean;
  dispatch: React.Dispatch<any>;
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  isFetching: false,
  error: false,
  dispatch: () => null,
});

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
