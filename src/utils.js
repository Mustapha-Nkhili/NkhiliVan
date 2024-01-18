import { redirect } from "react-router-dom";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  TwitterAuthProvider,
  GoogleAuthProvider
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
  // signInWithPopup(auth, new GoogleAuthProvider)
  // .then((result) => {
  //   const user = result.user;

  //   setUser({
  //     name: user.displayName,
  //     email: user.email,
  //     img: user.photoURL,
  //     phoneNumber: user.phoneNumber || "you haven't provide your phone number",
  //     createdAt: user.reloadUserInfo.createdAt,
  //     lastLoginAt: user.reloadUserInfo.lastLoginAt
  //   })
  //   throw redirect("/host")
  // }).catch((error) => {
  //   setUser(null)
  //   console.error(error.message)
  // });
  signInWithRedirect(auth, provider)
}
