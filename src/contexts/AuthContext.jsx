import { createContext, useContext, useReducer } from "react";
import { BASE_URL } from "../../config";

const AuthContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        error: null,
        user: action.payload,
        isAuthenticated: true,
      };

    case "logout":
      localStorage.removeItem("token");
      return { ...state, user: null, isAuthenticated: false };

    case "rejected":
      return { ...state, error: action.payload, isAuthenticated: false };

    default:
      throw new Error("Unknown action type");
  }
}

const initialState = {
  user: null,
  isAuthenticated: false,
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function login(email, password) {
    try {
      const res = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log(res);

      if (!res.ok) {
        const errorData = await res.json();
        dispatch({
          type: "rejected",
          payload: errorData.detail || "Login failed",
        });
        return false;
      }

      const data = await res.json();
      localStorage.setItem("token", data.access_token);
      dispatch({ type: "login", payload: data.user.name });
      return true;
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: err.message,
      });
    }
    return false;
  }

  function logout() {
    localStorage.removeItem("token");
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside  AuthProvider");

  return context;
}

export { AuthProvider, useAuth };
