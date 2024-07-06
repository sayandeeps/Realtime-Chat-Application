export interface IInitialState {
    user: null | any;
    isFetching: boolean;
    error: boolean;
  }
  export interface IAuthContext extends IInitialState {
    dispatch: React.Dispatch<any>;
    logout: () => void;
  }