import { getRedirectResult } from "firebase/auth";
import { useEffect, useContext } from "react";
import { AuthContext } from "./components/AuthProvider";
import { useNavigate } from "react-router-dom";
import { userInitialValue } from "./utils";

export const useAuthentication = (auth, pathname, setLoginError) => {
  const { setUser, setUserIsLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    return async () => {
      try {
        setUserIsLoading(true);
        const response = await getRedirectResult(auth);
        if (response) {
          setUser(userInitialValue(response))
          navigate(pathname, { replace: true });
        }
        setUserIsLoading(false);
      } catch (error) {
        setUserIsLoading(false);
        setLoginError(
          error?.message || "An error occurred during login. Please try again."
        );
        console.error(error.message);
      }
    };
  }, [auth, setUser, pathname, navigate, setUserIsLoading, setLoginError]);
};
