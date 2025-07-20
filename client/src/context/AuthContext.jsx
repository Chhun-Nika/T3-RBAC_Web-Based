import { useContext, createContext, useEffect, useState } from "react";
import { isAuthenticated, logout } from "../utils/auth.js";


// create the AuthContext 
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // on mount check for the token from local storage, get the token
        const user = isAuthenticated();
        // console.log(user.role);
        if(!user) {
            logout();
            setAuth(null)
        } else {
            setAuth(user)
        }
       
        setLoading(false);
    }, []);
    return (
        <AuthContext.Provider value={{ auth, setAuth, loading}}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to easily get the context values anywhere
export const useAuth = () => useContext(AuthContext);


// here's how to used the custom hook
// const { auth, setAuth, loading } = useAuth(); 