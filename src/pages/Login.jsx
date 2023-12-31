import {
  Link,
  useLoaderData,
  Form,
  redirect,
  useActionData,
  useNavigation,
  useNavigate,
} from "react-router-dom";
import { loginUser } from "../api";
import { useEffect } from "react";

export function loader({ request }) {
  const url = new URL(request.url);
  return url;
}

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const data = await loginUser({ email, password });
    console.log(data);
    localStorage.setItem("loggedin", true);
    throw redirect("/host");
  } catch (error) {
    if (error.status !== 302) {
      localStorage.removeItem("loggedin");
    }
    return error.status === 302 ? error.status : error.message;
  }
}

export default function Login() {
  const navigate = useNavigate();
  const message = useLoaderData().searchParams.get("message");
  const pathname = useLoaderData().searchParams.get("redirectTo") || "/host";
  const error = useActionData();
  const navigation = useNavigation();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("loggedin")) || error?.status === 302) {
      navigate(pathname, { replace: true });
    }
  }, [error, navigate, pathname]);

  return (
    <main className="login container">
      <h1>Sign in to your account</h1>
      {message && <h2 className="login-message">{message}</h2>}
      {error && error !== 302 && <h2 className="login-error">{error}</h2>}
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
      <span>
        Don't have an account? <Link>Create one now</Link>
      </span>
    </main>
  );
}
