import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { set } from "react-hook-form";
import { db } from "../firebase";
import { Game, User } from "../typings";

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
