export const LoginStart = (userCredentials:any) => {
    return {
        type: "LOGIN_START",
    };
};
export const LoginSuccess = (user:any) => {
    return {
        type: "LOGIN_SUCCESS",
        payload: user,
    };
};
export const LoginFailure = (error :any) => {
    return {
        type: "LOGIN_FAILURE",
        payload: error,
    };
};
// export Logout = () => {
//     return {
//         type: "LOGOUT",
//     };
// };
 