import {
  doc,
  DocumentData,
  getDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

function useUser(uid: string) {
  const [user, setUser] = useState<DocumentData>();

  async function getUser() {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    console.log("Document data:", docSnap.data());
    setUser(docSnap.data())
  }

  useEffect(() => {
    if (!uid) return;
    getUser()
  }, [db, uid]);
  return user;
}

export default useUser;
