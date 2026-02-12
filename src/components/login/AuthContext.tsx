import { createContext } from "react";

export type AuthContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  token: string | null;
  setToken: (value: string | null) => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);
