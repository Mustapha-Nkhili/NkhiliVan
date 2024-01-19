import { getRedirectResult } from "firebase/auth";
import { useEffect, useContext } from "react";
import { AuthContext } from "./components/AuthProvider";
import { redirect, useNavigate } from "react-router-dom";

export const useAuthentication = (auth, pathname, setLoginError) => {
  const { setUser, setUserIsLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    return async () => {
      try {
        setUserIsLoading(true);
        const response = await getRedirectResult(auth);
        if (response) {
          setUser({
            name: response.user.displayName || "John doe",
            email: response.user.email || "You haven't provide your email",
            img:
              response.user.photoURL ||
              "/src/assets/imgs/default-profile-picture.png",
            phoneNumber:
              response.user.phoneNumber ||
              "You haven't provide your phone number",
            createdAt: response.user.reloadUserInfo.createdAt,
            lastLoginAt: response.user.reloadUserInfo.lastLoginAt,
            userId: response.user.uid,
          });
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
