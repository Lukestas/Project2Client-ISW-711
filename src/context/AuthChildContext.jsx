import { createContext, useContext, useEffect, useState } from "react";
import {getChildrensRequest} from "../api/auth"
import { useAuth } from "./AuthContext";

export const AuthChildContext = createContext();

// This hook is used to access the AuthChildContext. It throws an error if it is not used within an AuthChildProvider.
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
            const ChildrenResquest = await getChildrensRequest();
            setChildr(ChildrenResquest.data);
        } catch (error) {
            console.log("front: Error obteniendo hijos:"+error.response?.data?.[0]);
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
