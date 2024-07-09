'use client'

// Import the required Firebase types
import { Auth, UserCredential, User, AuthCredential } from "firebase/auth";

import React, { useContext, useEffect } from "react";
import { createContext, ReactNode } from "react";
import { useState } from "react";

// Import getAuth, createUserWithEmailAndPassword, etc. from @firebase/auth
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
    onAuthStateChanged,
    deleteUser,
} from "firebase/auth";
import { app } from "./fireabase.config";
import Cookies from "js-cookie";

export const auth: Auth = getAuth(app);

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthContextType = {
    user: User | null;
    authLoading: boolean;
    createUser: (email: string, password: string) => Promise<UserCredential>;
    login: (email: string, password: string) => Promise<UserCredential>;
    socialLogin: (provider: AuthCredential) => Promise<UserCredential>;
    logout: () => Promise<void>;
    // deleteUser: () => Promise<void>; // Add this line
    // upDateUserInfo: (upDateInfo: { displayName?: string; photoURL?: string }) => Promise<void>;
    // removeUser: () => Promise<void>;
};

type AuthProviderProps = {
    children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<any>(null);
    const [authLoading, setAuthLoading] = useState(true);

    const createUser = (email: string, pass: string) => {
        return createUserWithEmailAndPassword(auth, email, pass);
    };

    const login = (email: string, pass: string) => {
        return signInWithEmailAndPassword(auth, email, pass);
    };

    const socialLogin = (provider: AuthCredential) => {
        return signInWithPopup(auth, provider);
    };

    const logout = () => {
        return signOut(auth);
    };


    const getUserDetailsFromDB = async (email: string) => {

        //getting token from cookies
        const token = Cookies.get('conventenToken');
        const res = fetch('http://localhost:25000/', {
            method: 'POST',
            headers: {
                "authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `query Users($where: UserWhere) {
                    users(where: $where) {
                      name
                      userId
                      user_type
                      status
                      createdAt
                      permissions
                      isProfileCompleted
                    }
                  }`,
                variables: {
                    where: {
                        email: email
                    },
                },

            })
        })

        const { data } = await res.then(res => res.json())
        return data?.users[0]
    }



    useEffect(() => {


        const unSubscribe = onAuthStateChanged(auth, (currentUser: any) => {
            getUserDetailsFromDB(currentUser?.email).then((res) => {

                setUser({
                    ...currentUser,
                    ...res
                })
                setAuthLoading(false);
            })
        });
        return () => unSubscribe();
    }, []);

    const authInfo: AuthContextType = {
        user,
        authLoading,
        createUser,
        login,
        socialLogin,
        logout,
    };

    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;




// return (
//   <>
//     <AuthContext.Provider value={authInfo}>
//       {children}
//     </AuthContext.Provider>
//   </>
// );


// export default AuthProvider;

export const useAuth = (): AuthContextType => {
    const authInfo = useContext(AuthContext);
    if (!authInfo) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return authInfo;
};