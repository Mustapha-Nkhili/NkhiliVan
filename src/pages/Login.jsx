import {
  Link,
  useLoaderData,
  Form,
  useActionData,
  useNavigation,
  useNavigate,
} from "react-router-dom";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../firebaseConfig";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signInWithProvider } from "../utils";
import {
  faFacebook,
  faGoogle,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import PageLoader from "./PageLoader";
import { useAuthentication } from "../authHooks";
import { getUser } from "../api";

const auth = getAuth(app);

export function loader({ request }) {
  const url = new URL(request.url);
  return url;
}

export function action(setUser) {
  return async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      let response = await signInWithEmailAndPassword(auth, email, password);
      setUser(await getUser(response.user.uid));
    } catch (error) {
      setUser(null);
      return (
        error?.message?.match(/\b(?!firebase\b)\w+\b/gi).join(" ") ||
        "An error occurred during login. Please try again."
      );
    }
  };
}

export default function Login() {
  const pathname = useLoaderData().searchParams.get("redirectTo") || "/host";
  const navigate = useNavigate();
  const { user, userIsLoading, setUserIsLoading } = useContext(AuthContext);
  const message = useLoaderData().searchParams.get("message");
  const error = useActionData();
  const [loginError, setLoginError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (user) {
      navigate(pathname, { replace: true });
    }
  }, [user, pathname, navigate]);

  useAuthentication(auth, pathname, setLoginError);

  function signInUsingProvider(provider) {
    signInWithProvider(provider);
    setUserIsLoading(true);
  }

  return userIsLoading ? (
    <PageLoader />
  ) : (
    <main className="login container">
      <h1>Sign in to your account</h1>
      {message && <h2 className="login-message">{message}</h2>}
      {error && <h2 className="login-error">{error}</h2>}
      <Form method="post" replace>
        <input
          type="email"
          name="email"
          id="loginEmail"
          className="login-email"
          placeholder="you@example.com"
          required
        />
        <input
          type="password"
          name="password"
          id="loginPassword"
          className="login-password"
          placeholder="Enter your password"
          required
        />
        <button
          className="login-btn"
          disabled={navigation.state === "submitting"}
        >
          {navigation.state === "submitting" ? "Logging in..." : "Log in"}
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
        Don't have an account? <Link to={`/signup`}>Create one now</Link>
      </span>

      {loginError && <div className="login-error">{loginError}</div>}
    </main>
  );
}
