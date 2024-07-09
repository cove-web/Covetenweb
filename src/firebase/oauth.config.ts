'use client'
import { OAuthProvider, signOut, getAuth, signInWithRedirect,createUserWithEmailAndPassword,signInWithEmailAndPassword, getRedirectResult, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import { app } from "./fireabase.config";
import { useState, useEffect } from "react";





const AuthConfig = () => {

  // states
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  const provider = new OAuthProvider('oidc.google');
   const auth = getAuth(app);
  

  
 async function signInWithRedirectGoogle() {
    try {
      setAuthLoading(true)
        await signInWithRedirect(auth, provider);
    } catch (error: any) {
        console.error("Error signing in with Google:", error.message);
        throw error;
    } finally {
      setAuthLoading(false)
    }
  }
  
 async function signUpWithEmailAndPassword(email: string, password: string) {
    try {
      setAuthLoading(true)
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return user;
    } catch (error: any) {
        console.error("Error creating user:", error.message);
        throw error;
    } finally {
      setAuthLoading(false)
    }
  }
  
 async function logInWithEmailAndPassword(email: string, password: string) {
    try {
      setAuthLoading(true)
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        return user;
    } catch (error: any) {
        console.error("Error signing in:", error.message);
        throw error;
    } finally {
      setAuthLoading(false)
    }
  }
 async function resetPassword(email: string) {
    try {
      setAuthLoading(true)
    const result = await  sendPasswordResetEmail(auth, email)
      return result;

    } catch (error: any) {
        console.error("Error signing in:", error.message);
        throw error;
    } finally {
      setAuthLoading(false)
    }
  }




  
 async function syncUser() {
    try {
      setAuthLoading(true)
        const result = await getRedirectResult(auth);
        if (result) {
            const user = result.user;
            const credential = OAuthProvider.credentialFromResult(result);
  
            if (credential) {
                const token = credential.accessToken;
                const idToken = credential.idToken;
            }
        }
    } catch (error: any) {
        console.error("Error syncing user:", error.message);
    } finally {
      setAuthLoading(false)
    }
  }
  
 const currentUserData =  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
     return user.email
    } else {
      // User is signed out
      // ...
    }
  });
  
  
 function logout() {
      signOut(auth).then(() => {
        return null
      }).catch((error: any) => {
          // An error happened.
      });
  }
  

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unSubscribe();
  }, []);


  return { signInWithRedirectGoogle, resetPassword, signUpWithEmailAndPassword, logInWithEmailAndPassword, currentUserData, logout, user, authLoading }
  

};


export default AuthConfig;

