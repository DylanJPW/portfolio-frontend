import { createContext, useContext, useState } from "react";

export type AuthContextType = {
  isLoggedIn: boolean;
  authToken: string | null;
  login: (value: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authToken, setAuthToken] = useState<string | null>(null);

  const login = (newToken: string) => {
    localStorage.setItem("jwt", newToken);
    setAuthToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!authToken,
        authToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
