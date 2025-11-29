import axios from "axios";
import React, {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from "react";
import type { Action, State, userContextType } from "../types/userContextTypes";

const initialState: State = {
  show: false,
  formToggle: true,
  email: "",
  password: "",
  confirmPassword: "",
  error: null,
  success: null,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SHOW_MODEL":
      return { ...state, show: true };
    case "HIDE_MODEL":
      return { ...state, show: false };
    case "SWITCH_FORM":
      return { ...state, formToggle: !state.formToggle };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_CONFIRM_PASSWORD":
      return { ...state, confirmPassword: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_SUCCES":
      return { ...state, success: action.payload };
    case "RESET_FORM":
      return { ...state, email: "", password: "", confirmPassword: "" };
    default:
      return state;
  }
};

const userContext = createContext<userContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleShow = () => dispatch({ type: "SHOW_MODEL" });
  const handleClose = () => dispatch({ type: "HIDE_MODEL" });
  const switchForms = () => dispatch({ type: "SWITCH_FORM" });

  const handleEmail = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => dispatch({ type: "SET_EMAIL", payload: e.target.value });

  const handlePassword = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => dispatch({ type: "SET_PASSWORD", payload: e.target.value });

  const handleConfirmPassword = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => dispatch({ type: "SET_CONFIRM_PASSWORD", payload: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const endPoint = state.formToggle ? "login" : "register";
    if (!state.formToggle) {
      if (!state.confirmPassword.trim()) {
        dispatch({
          type: "SET_ERROR",
          payload: "Confirm password is required",
        });
        return;
      }

      if (state.password !== state.confirmPassword) {
        dispatch({
          type: "SET_ERROR",
          payload: "Passwords do not match",
        });
        return;
      }
    }

    try {
      const bodyData = state.formToggle
        ? { email: state.email, password: state.password }
        : {
            email: state.email,
            password: state.password,
            confirmPassword: state.confirmPassword,
          };

      const response = await axios.post(
        `http://localhost:3001/api/auth/${endPoint}`,
        bodyData
      );

      const { token, user } = response.data.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      dispatch({
        type: "SET_SUCCES",
        payload: response.data.status || "Success",
      });
      dispatch({ type: "SET_ERROR", payload: null });
      dispatch({ type: "RESET_FORM" });

      setTimeout(() => {
        dispatch({ type: "SET_SUCCES", payload: null });
        handleClose();
      }, 300);
    } catch (err: any) {
      dispatch({
        type: "SET_ERROR",
        payload: err.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <userContext.Provider
      value={{
        ...state,
        handleShow,
        handleClose,
        switchForms,
        handleEmail,
        handlePassword,
        handleConfirmPassword,
        handleSubmit,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export const useUserContext = (): userContextType => {
  const context = useContext(userContext);
  if (!context)
    throw new Error("useUserContext must be used within a UserProvider");
  return context;
};
