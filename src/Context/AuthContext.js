import React from "react";
import { createContext, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../Firebase/config";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { usersColRef } from "../Firebase/config";
const UserAuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userDocRef, setUserDocRef] = useState(null);

  useEffect(() => {
    const getUserDoc = async (user) => {
      const userDoc = await getDoc(doc(usersColRef, user.uid));
      setUserDocRef(userDoc);
    };
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        getUserDoc(user);
      } else {
        setUser(null);
        setUserDocRef(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserAuthContext.Provider value={{ user, userDocRef }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(UserAuthContext);
};
