import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";

import {db} from "./firebaseConfig"

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
