import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import initializeFirebase from "../Firebase/firebase.init";

initializeFirebase();
const useFirebase = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState("");
  const [admin, setAdmin] = useState(false);
  const auth = getAuth();
//   const location = useLocation();
    
  const googleProvider = new GoogleAuthProvider();

  const signInUsingGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  //regitration
  const registerUser = (email, password, name, nevigate, location) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const newUser = { email, displayName: name };
        setUser(newUser);
        // savedUser(email,name)
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {})
          .catch((error) => {});
        const destination = location?.state?.from || "/home";
        nevigate(destination);
        setAuthError("");
      })
      .catch((error) => {
        setAuthError(error.message);
      })
      .finally(() => setLoading(false));
  };
  //login
  const loginUser = (email, password, location, nevigate) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password, location, nevigate)
      .then((result) => {
        setUser(result.user);
        const destination = location?.state?.from || "/home";
        nevigate(destination);
        setAuthError("");
      })
      .catch((error) => {
        setAuthError(error.message);
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setLoading(false);
    });

    return () => unsubscribe;
  }, []);
  const logOut = () => {
    setLoading(true);
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {})
      .finally(() => setLoading(false));
  };


  return {
    signInUsingGoogle,
    user,
    admin,
    registerUser,
    logOut,
    loginUser,
    loading,
    authError,
  };
};

export default useFirebase;
