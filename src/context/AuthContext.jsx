import { createContext, useContext, useEffect, useState } from "react";
import { registerParentRequest, loginParentRequest, verifyTokenRequest, logoutParentRequest } from '../api/auth';
import Cookies from 'js-cookie'

export const AuthContext = createContext()
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [parent, setParent] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 2500)
            return () => clearTimeout(timer)
        }
    }, [errors])

    const signup = async (parent) => {
        try {
            const res = await registerParentRequest(parent);
            setParent(res.data)
            setIsAuthenticated(true);

        } catch (error) {
            setErrors(error.response.data)
        }
    };

    const signin = async (parent) => {
        try {
            const res = await loginParentRequest(parent)
            setParent(res.data)
            setIsAuthenticated(true);
        } catch (error) {
            setErrors(error.response?.data || ["Error al iniciar sesión"]);
            setIsAuthenticated(false);
        }
    }

    const logout = async () => {
        Cookies.remove("token");
        setParent(null);
        setIsAuthenticated(false);
        await logoutParentRequest()
    };


    useEffect(() => {
        const checkLogin = async () => {
            setLoading(true);

            const cookies = Cookies.get();
            if (!cookies.token) {
                setIsAuthenticated(false);
                setParent(null)
                setLoading(false);
                return;
            }

            try {
                const res = await verifyTokenRequest();
                if (!res.data) {
                    setIsAuthenticated(false);
                    setParent(null);
                }
                setIsAuthenticated(true);
                setParent(res.data);
            } catch (error) {
                console.error("Error verificando el token:", error);
                setIsAuthenticated(false);
                setParent(null);
            }
            setLoading(false);
        };
        checkLogin();
    }, []);


    return (
        <AuthContext.Provider value={{
            errors,
            signup,
            signin,
            logout,
            loading,
            parent,
            isAuthenticated
        }}>
            {children}
        </AuthContext.Provider>
    )
}