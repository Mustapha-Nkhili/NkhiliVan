import {
  Link,
  useLoaderData,
  Form,
  // redirect,
  useActionData,
  useNavigation,
  useNavigate,
  redirect,
} from "react-router-dom";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
  getAuth,
  getRedirectResult,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../firebaseConfig";
import { useContext, useEffect } from "react";
import { AuthContext } from "../components/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signInWithProvider } from "../utils";
import { faFacebook, faGoogle, faXTwitter } from "@fortawesome/free-brands-svg-icons";

const auth = getAuth(app);

export function loader({ request }) {
  const url = new URL(request.url);
  return url;
}

export function action(setUser) {
  return async ({ request }) => {
    const formData = await request.formData();
    // const pathname =
    //   new URL(request.url).searchParams.get("redirectTo") || "/host";
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setUser(true);
      // return redirect(pathname)
    } catch (error) {
      setUser(false);
      return error?.message?.match(/\b(?!firebase\b)\w+\b/gi).join(" ");
    }
  };
}

export default function Login() {
  const pathname = useLoaderData().searchParams.get("redirectTo") || "/host";
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const message = useLoaderData().searchParams.get("message");
  const error = useActionData();
  const navigation = useNavigation();
  const auth = getAuth(app);

  useEffect(() => {
    if (user) {
      navigate(pathname, { replace: true });
    }
  }, [user, pathname, navigate]);

  useEffect(() => {
    return async () => {
      const response = await getRedirectResult(auth);
      if (response) {
        console.log(response.user);
        setUser({
          name: response.user.displayName,
          email: response.user.email,
          img: response.user.photoURL,
          phoneNumber:
            response.user.phoneNumber ||
            "You haven't provide your phone number",
          createdAt: response.user.reloadUserInfo.createdAt,
          lastLoginAt: response.user.reloadUserInfo.lastLoginAt,
        });
        console.log(response.user.photoURL)
        throw redirect(pathname);
      }
    };
  }, [auth, setUser, pathname]);

  return (
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
          onClick={() => signInWithProvider(new GoogleAuthProvider())}
        >
          <FontAwesomeIcon icon={faGoogle} />
        </li>
        <li
          className="sign-method twitter"
          onClick={() => signInWithProvider(new TwitterAuthProvider())}
        >
          <FontAwesomeIcon icon={faXTwitter} />
        </li>
        <li
          className="sign-method facebook"
          onClick={() => signInWithProvider(new FacebookAuthProvider())}
        >
          <FontAwesomeIcon icon={faFacebook} />
        </li>
      </ul>
      <span>
        Don't have an account? <Link to={`/signup`}>Create one now</Link>
      </span>
    </main>
  );
}
