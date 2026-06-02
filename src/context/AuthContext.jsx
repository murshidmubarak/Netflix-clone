import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../fireBase";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

      setUser(currentUser);

      setLoading(false);
    });

    return () => unsubscribe();

  }, []);

  return (
    <AuthContext.Provider value={{ user }}>

      {!loading && children}

    </AuthContext.Provider>
  );
};

export default AuthContextProvider;