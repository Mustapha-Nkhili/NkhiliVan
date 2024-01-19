import { redirect } from "react-router-dom";
import {
  getAuth,
  signInWithRedirect,
} from "firebase/auth";
import { app } from "./firebaseConfig";

const auth = getAuth(app);

export async function requireAuth(request, user) {
  const pathname = new URL(request.url).pathname;
  if (!user) {
    throw redirect(
      `/login?message=You have to login or sign up first&&redirectTo=${pathname}`
    );
  }
}

export async function signInWithProvider(provider) {
  signInWithRedirect(auth, provider)
}
