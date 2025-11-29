export interface State {
  show: boolean;
  formToggle: boolean;
  email: string;
  password: string;
  confirmPassword: string;
  error: string | null;
  success: string | null;
}

export type Action =
  | { type: "SHOW_MODEL" }
  | { type: "HIDE_MODEL" }
  | { type: "SWITCH_FORM" }
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "SET_CONFIRM_PASSWORD"; payload: string }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_SUCCES"; payload: string | null }
  | { type: "RESET_FORM" };
export interface userContextType extends State {
  handleClose: () => void;
  handleShow: () => void;
  switchForms: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleEmail: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handlePassword: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleConfirmPassword: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}
