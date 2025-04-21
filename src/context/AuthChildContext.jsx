import { createContext, useContext, useEffect, useState } from "react";
import {getChildrensRequest} from "../api/auth"
import { useAuth } from "./AuthContext";

export const AuthChildContext = createContext();

export const useAuthChild = () => {
    const context = useContext(AuthChildContext);
    if (!context) {
        throw new Error("useAuthChild must be used within and AuthChildProvider");
    }
    return context;
}

export const AuthChildProvider = ({ children  }) => {
    const {isAuthenticated} = useAuth();
    const [child, setChild] = useState(null);
    const [childr, setChildr] = useState([]);
    const [isChildAuthenticated, setIsChildAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (isAuthenticated) {
            getChildrens();
        }
    }, [isAuthenticated])

    const getChildrens = async () => {
        try {
            const res = await getChildrensRequest();
            setChildr(res.data);
        } catch (error) {
            console.log("front: Error obteniendo hijos:", error);
        }
    };

    const selectChild = (childId) => {
        const selectedChild = childr.find((c) => c._id === childId);
        return setChild(selectedChild);
    }
    
    return (
        <AuthChildContext.Provider value={{
            child,
            childr,
            errors,
            isChildAuthenticated,
            selectChild
        }}>{children }
        </AuthChildContext.Provider>
    )
}
