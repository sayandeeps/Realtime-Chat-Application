const AuthReducer = (state: any, action: any): any => {
    switch (action.type) {
        case "LOGIN_START":
        return {
            user: null,
            isfetching: true,
            error: false,
        };
        case "LOGIN_SUCCESS":
        return {
            user: action.payload,
            isfetching: false,
            error: false,
        };
        case "LOGIN_FAILURE":
        return {
            user: null,
            isfetching: false,
            error: action.payload,
        };
        case "LOGOUT":
        return {
            user: null,
            isfetching: false,
            error: false,
        };
        default:
        return state;
    }

}
export default AuthReducer;