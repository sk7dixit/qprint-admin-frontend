import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (identifier, password) => {
        // Normalize identifier: if it's a 10-digit number, treat it as a QPrint Admin Identity
        let email = identifier;
        const phoneRegex = /^[0-9]{10}$/;
        if (phoneRegex.test(identifier)) {
            email = `${identifier}@qprint.com`;
        } else if (!identifier.includes("@")) {
            // Fallback for non-email identifiers
            email = `${identifier}@qprint.com`;
        }

        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const u = userCredential.user;
        const token = await u.getIdToken();
        const backendUrl = "http://localhost:5000";
        const response = await fetch(`${backendUrl}/api/auth/profile/${u.uid}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (response.ok) {
            const profile = await response.json();
            if (profile.role === "admin") {
                const fullUser = { ...u, ...profile };
                setUser(fullUser);
                return fullUser;
            } else {
                await signOut(auth);
                throw new Error("Unauthorized: Admin role required");
            }
        } else {
            await signOut(auth);
            throw new Error("Could not verify administrative identity");
        }
    };

    const logout = () => signOut(auth);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (u) => {
            if (u) {
                try {
                    const token = await u.getIdToken();
                    const backendUrl = "http://localhost:5000";
                    const response = await fetch(`${backendUrl}/api/auth/profile/${u.uid}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    if (response.ok) {
                        const profile = await response.json();
                        setUser({ ...u, ...profile });
                    } else {
                        setUser(null);
                    }
                } catch (e) {
                    console.error("Auth sync error:", e);
                    setUser(null);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return unsub;
    }, []);

    const getToken = async () => {
        if (!auth.currentUser) return null;
        return await auth.currentUser.getIdToken();
    };

    return (
        <AuthContext.Provider value={{ user, setUser, loading, login, logout, getToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
