import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  setDoc,
} from "firebase/firestore";

import { db } from "./firebaseConfig";
import { nanoid } from "nanoid";

const vansCollectionRef = collection(db, "vans");

export async function getVans() {
  try {
    const vansSnapshot = await getDocs(vansCollectionRef);
    const vans = vansSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    return vans;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw { error: "An error occurred while fetching data." };
  }
}

export async function getVan(id) {
  try {
    const docRef = doc(db, "vans", id);
    const vanSnapshot = await getDoc(docRef);

    return {
      ...vanSnapshot.data(),
      id: vanSnapshot.id,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw { error: "An error occurred while fetching data." };
  }
}

export async function getHostVans() {
  try {
    const Query = query(vansCollectionRef, where("hostId", "==", 123));
    const hostVansSnapshot = await getDocs(Query);
    const hostVans = hostVansSnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });

    return hostVans;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw { error: "An error occurred while fetching data." };
  }
}

export async function storeUserInDB(user) {
  try {
    await setDoc(doc(db, "users", user.userId), user);
  } catch (error) {
    console.error(error);
  }
}

export async function getUser(userId) {
  try {
    const docRef = doc(db, "users", userId);
    const userSnapshot = await getDoc(docRef);

    return userSnapshot.data();
  } catch (error) {
    console.error(error);
  }
}

export async function storeNewVanInDB(userId, newVan) {
  try {
    await setDoc(doc(db, "vans", nanoid()), {
      name: newVan.name,
      description: newVan.description,
      hostId: userId,
      price: newVan.price,
      imageUrl: newVan.imageUrl,
      type: newVan.type,
    });
  } catch (error) {
    console.error(error);
  }
}
