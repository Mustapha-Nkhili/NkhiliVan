import { createContext, useState } from "react";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(false);
  const [userIsLoading, setUserIsLoading] = useState(false);

  return (
    <AuthContext.Provider
      value={{ user, setUser, userIsLoading, setUserIsLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
