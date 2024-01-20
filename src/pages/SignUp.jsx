import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  TwitterAuthProvider,
  FacebookAuthProvider,
  sendEmailVerification,
} from "firebase/auth";
import { AuthContext } from "../components/AuthProvider";
import { app } from "../firebaseConfig";
import { signInWithProvider } from "../utils";
import { useAuthentication } from "../authHooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGoogle,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import PageLoader from "./PageLoader";
import defaultProfileImg from "../assets/imgs/default-profile-picture.png";

let verficationEmailSent = false;

const auth = getAuth(app);
export function loader({ request }) {
  const url = new URL(request.url);
  return url;
}

export function action(setUser) {
  return async ({ request }) => {
    const formData = await request.formData();
    const firstName = formData.get("userFirstName");
    const lastName = formData.get("userLastName");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      let response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (response) {
        await sendEmailVerification(auth.currentUser);
        verficationEmailSent = true;
        setUser({
          name: response.user.displayName || `${firstName} ${lastName}`,
          email: response.user.email || "You haven't provide your email",
          img: response.user.photoURL || defaultProfileImg,
          phoneNumber:
            response.user.phoneNumber ||
            "You haven't provide your phone number",
          createdAt: response.user.reloadUserInfo.createdAt,
          lastLoginAt: response.user.reloadUserInfo.lastLoginAt,
          userId: response.user.uid,
        });
      }
    } catch (error) {
      setUser(null);
      return (
        error?.message?.match(/\b(?!firebase\b)\w+\b/gi).join(" ") ||
        "An error occurred during login. Please try again."
      );
    }
  };
}
export default function SignUp() {
  const error = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const pathname = useLoaderData().searchParams.get("redirectTo") || "/host";
  const { user, userIsLoading, setIsVerificationEmailSent, setUserIsLoading } =
    useContext(AuthContext);
  const [loginError, setLoginError] = useState(null);

  useEffect(() => {
    setIsVerificationEmailSent(verficationEmailSent);
  }, [setIsVerificationEmailSent]);

  useEffect(() => {
    if (user) {
      navigate(pathname, { replace: true });
    }
  }, [user, navigate, pathname]);

  function signInUsingProvider(provider) {
    signInWithProvider(provider);
    setUserIsLoading(true);
  }

  useAuthentication(auth, pathname, setLoginError);

  return userIsLoading ? (
    <PageLoader />
  ) : (
    <main className="sign-up container">
      <h1>Sign up</h1>
      {error && <h2 className="sign-up-error">{error}</h2>}
      {loginError && <div className="login-erro">{loginError}</div>}
      <Form method="post" replace>
        <input
          type="text"
          name="userFirstName"
          className="sign-up-user-name"
          placeholder="Your first name"
          required
        />
        <input
          type="text"
          name="userLastName"
          className="sign-up-user-name"
          placeholder="Your last name"
        />
        <input
          type="email"
          name="email"
          id="signUpEmail"
          className="sign-up-email"
          placeholder="you@example.com"
          required
        />
        <input
          type="password"
          name="password"
          id="signUpPassword"
          className="sign-up-password"
          placeholder="Enter your password"
          required
        />
        <button
          className="sign-up-btn"
          disabled={navigation.state === "submitting"}
        >
          {navigation.state === "submitting" ? "Signing up..." : "Sign up"}
        </button>
      </Form>
      <div className="other-sign-methods">
        <span>Or</span>
      </div>
      <ul className="sign-methods">
        <li
          className="sign-method google"
          onClick={() => signInUsingProvider(new GoogleAuthProvider())}
        >
          <FontAwesomeIcon icon={faGoogle} />
        </li>
        <li
          className="sign-method twitter"
          onClick={() => signInUsingProvider(new TwitterAuthProvider())}
        >
          <FontAwesomeIcon icon={faXTwitter} />
        </li>
        <li
          className="sign-method facebook"
          onClick={() => signInUsingProvider(new FacebookAuthProvider())}
        >
          <FontAwesomeIcon icon={faFacebook} />
        </li>
      </ul>
      <span>
        Already have an account? <Link to="/login">Sign in</Link>
      </span>
    </main>
  );
}
