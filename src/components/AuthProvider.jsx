import { createContext, useState } from "react";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userIsLoading, setUserIsLoading] = useState(null);
  const [isVerificationEmailSent, setIsVerificationEmailSent] = useState(null);

  const values = {
    user,
    setUser,
    userIsLoading,
    setUserIsLoading,
    isVerificationEmailSent,
    setIsVerificationEmailSent
  }
  return (
    <AuthContext.Provider
      value={values}
    >
      {children}
    </AuthContext.Provider>
  );
}
