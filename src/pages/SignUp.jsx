import {
  Form,
  Link,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { useContext, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  TwitterAuthProvider,
  FacebookAuthProvider,
  // sendEmailVerification,
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

const auth = getAuth(app);
export function loader({ request }) {
  const url = new URL(request.url);
  return url;
}

export function action(setUser) {
  return async ({ request }) => {
    const formData = await request.formData();
    const pathname =
      new URL(request.url).searchParams.get("redirectTo") || "/host";
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // sendEmailVerification(auth.currentUser).then(() => {
      //   console.log("verfication sent");
      // });
      setUser(true);
      return redirect(pathname);
    } catch (error) {
      setUser(false);
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
  const pathname = useLoaderData().searchParams.get("redirectTo") || "/host";
  const { userIsLoading } = useContext(AuthContext);
  const [loginError, setLoginError] = useState(null);

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
        Already have an account? <Link to="/login">Sign in</Link>
      </span>
    </main>
  );
}
