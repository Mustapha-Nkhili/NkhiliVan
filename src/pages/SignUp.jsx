import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  // sendEmailVerification,
} from "firebase/auth";
import { app } from "../firebaseConfig";

export function action(setUser) {
  return async ({ request }) => {
    const formData = await request.formData();
    const pathname =
      new URL(request.url).searchParams.get("redirectTo") || "/host";
    const email = formData.get("email");
    const password = formData.get("password");
    const auth = getAuth(app);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // sendEmailVerification(auth.currentUser).then(() => {
      //   console.log("verfication sent");
      // });
      setUser(true);
      return redirect(pathname);
    } catch (error) {
      setUser(false);
      return error?.message?.match(/\b(?!firebase\b)\w+\b/gi).join(" ");
    }
  };
}
export default function SignUp() {
  const error = useActionData();
  const navigation = useNavigation();

  return (
    <main className="sign-up container">
      <h1>Sign up</h1>
      {error && <h2 className="sign-up-error">{error}</h2>}
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
