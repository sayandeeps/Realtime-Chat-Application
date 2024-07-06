import axios from "axios";

export const loginCall = async (userCredentials: { email: string; password: string }, dispatch: React.Dispatch<any>) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("http://localhost:8800/api/auth/login", userCredentials);
    console.log("Dispatching LOGIN_SUCCESS action:", { type: "LOGIN_SUCCESS", payload: res.data });
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  }catch (err) {
    console.error("Login error:", err);
    if (axios.isAxiosError(err)) {
      console.error("Axios error response:", err.response);
      dispatch({ type: "LOGIN_FAILURE", payload: err.response?.data || "Unknown error" });
    } else {
      dispatch({ type: "LOGIN_FAILURE", payload: "An unexpected error occurred" });
    }
  }
}
