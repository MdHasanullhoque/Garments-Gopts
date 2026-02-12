
import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig.js"

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                // Transform Firebase user to our format
                setUser({
                    uid: currentUser.uid,
                    name: currentUser.displayName || "Unknown",
                    email: currentUser.email,
                    photoURL: currentUser.photoURL || "",
                    role: "buyer",       // default
                    status: "pending"    // default
                });
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
