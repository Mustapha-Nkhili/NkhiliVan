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

export const userInitialValue = (response) => {
  return {
    name: response.user.displayName || "John Doe",
    email: response.user.email || "You haven't provide your email",
    img: response.user.photoURL || "/src/assets/imgs/default-profile-picture.png",
    phoneNumber:
      response.user.phoneNumber ||
      "You haven't provide your phone number",
    createdAt: response.user.reloadUserInfo.createdAt,
    lastLoginAt: response.user.reloadUserInfo.lastLoginAt,
    userId: response.user.uid,
  }
}