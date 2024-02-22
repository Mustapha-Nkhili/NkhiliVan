import { getRedirectResult } from "firebase/auth";
import { useEffect, useContext } from "react";
import { AuthContext } from "./components/AuthProvider";
import { useNavigate } from "react-router-dom";
import defaultBannerImg from "./assets/imgs/Hero-Banner-Placeholder-Light.png";
import { storeUserInDB, getUser } from "./api";

export const useAuthentication = (auth, pathname, setLoginError) => {
  const { setUser, setUserIsLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    return async () => {
      try {
        const response = await getRedirectResult(auth);
        if (response) {
          navigate(pathname, { replace: true });
          if (!await getUser(response.user.uid)) {
            storeUserInDB({
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
          }
          setUser(await getUser(response.user.uid));
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
