import {
  Form,
  Link,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  // sendEmailVerification,
} from "firebase/auth";
import { app } from "../firebaseConfig";
import { useEffect, useState } from "react";

export function loader({ request }) {
  const url = new URL(request.url);
  return url;
}

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const auth = getAuth(app);

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // sendEmailVerification(auth.currentUser).then(() => {
    //   console.log("verfication sent");
    // });
    const user = userCredential.user;
    console.log(user);
    localStorage.setItem("loggedin", true);
    throw redirect("/host");
  } catch (error) {
    if (error.status !== 302) {
      localStorage.removeItem("loggedin");
    }
    return error.status === 302 ? error.status : error.message;
  }
}
export default function SignUp() {
  const pathname = useLoaderData().searchParams.get("redirectTo") || "/host";
  const navigate = useNavigate();
  const error = useActionData();
  const [signUpError, setSignUpError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("loggedin")) || error === 302) {
      navigate(pathname, { replace: true });
    } else if (typeof error === "string") {
      let err = error.split(" ");
      err.shift();
      setSignUpError(err.join(" "));
    }
  }, [error, navigate, pathname]);
  return (
    <main className="sign-up container">
      <h1>Sign up</h1>
      {signUpError && <h2 className="sign-up-error">{signUpError}</h2>}
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
      <span>
        Already have an account? <Link to="/login">Sign in</Link>
      </span>
    </main>
  );
}
