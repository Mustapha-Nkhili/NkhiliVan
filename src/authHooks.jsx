import { getRedirectResult } from "firebase/auth";
import { useEffect, useContext } from "react";
import { AuthContext } from "./components/AuthProvider";
import { useNavigate } from "react-router-dom";
import defaultBannerImg from "./assets/imgs/Hero-Banner-Placeholder-Light.png";

export const useAuthentication = (auth, pathname, setLoginError) => {
  const { setUser, setUserIsLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    return async () => {
      try {
        const response = await getRedirectResult(auth);
        if (response) {
          setUser({
            name: response.user.displayName || "John doe",
            email: response.user.email || "You haven't provide your email",
            img: response.user.photoURL || defaultBannerImg,
            phoneNumber:
              response.user.phoneNumber ||
              "You haven't provide your phone number",
            createdAt: response.user.reloadUserInfo.createdAt,
            lastLoginAt: response.user.reloadUserInfo.lastLoginAt,
            userId: response.user.uid,
          });
          navigate(pathname, { replace: true });
        }
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
