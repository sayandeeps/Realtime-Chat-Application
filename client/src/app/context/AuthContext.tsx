'use client'
import { createContext, useEffect, useReducer } from "react";
import Cookies from 'js-cookie';
import AuthReducer from "./AuthReducer";
import { LoginSuccess, Logout } from "./AuthActions";
import { IInitialState, IAuthContext } from "../../types/types";


const INITIAL_STATE: IInitialState = {
  user: null,
  isFetching: false,
  error: false,
};


export const AuthContext = createContext<IAuthContext>({
  ...INITIAL_STATE,
  dispatch: () => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
 
  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      try {
        const user = JSON.parse(userCookie);
        dispatch(LoginSuccess(user));
      } catch (error) {
        console.error('Failed to parse user cookie:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (state.user) {
      Cookies.set('user', JSON.stringify(state.user), {
        expires: 30, // 30 days
      });
    } else {
      Cookies.remove('user');
    }
  }, [state.user]);

  const logout = () => {
    dispatch(Logout());
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
