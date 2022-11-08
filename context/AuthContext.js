import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc} from "firebase/firestore";
import { MarketPlace } from "../components/Utils/enums";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [market, setMarket] = useState([]);

  const xpMultipler = (userData?.boosters || []).find(booster => booster.type === "xp")?.multiply || 1
  const coinsMultipler = (userData?.boosters || []).find(booster => booster.type === "coins")?.multiply || 1

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);



  // GETTING DATA FROM FB

  const getUserData = async () => {
    const docSnap = await getDoc(doc(db, "users", user.uid));

    if (docSnap.exists()) {
      setUserData(docSnap.data());
      return true;
    } else {
      return false;
    }
  };

    const getMarketPlace = async () => {
      const docSnap = await getDoc(doc(db, "marketplace", MarketPlace.Key));

    if (docSnap.exists()) {
      setMarket(docSnap.data());
      return true;
    } else {
      return false;
    }
    };

  // Getting user data on app load

  useEffect(() => {
    if (user) {
      getUserData()
      getMarketPlace()
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        createUser,
        signIn,
        user,
        logout,
        isLoading,
        userData,
        getUserData,
        market,
        xpMultipler,
        coinsMultipler
      }}
    >
      {!isLoading && children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
