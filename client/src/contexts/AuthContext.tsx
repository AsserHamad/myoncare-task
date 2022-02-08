import React, { createContext, useContext, useEffect, useState } from "react";
import { verifyToken } from "../utils/apiRequests";
import { UserI } from "../types/general.types";
import { isEmptyObject } from "../utils/functions.util";

const AuthContext = createContext({
    user: {},
    authenticated: false,
    setUser: (prop : UserI) => {},
    userLoading: true,
    logout: () => {}
});

export const AuthContextProvider = ({children} : {children: React.ReactNode}) => {
    const [user, setUser] = useState<UserI>({});
    const [authenticated, setAuthenticated] = useState(false);
    const [userLoading, setUserLoading] = useState(true);

    useEffect(() => {
        setAuthenticated(!isEmptyObject(user));
    }, [user]);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if(token) {
            (async () => {
                try {
                    const {data : user} = await verifyToken();
                    setUser(user);
                } catch (e) {
                    localStorage.removeItem('accessToken');
                } finally {
                    setUserLoading(false);
                }
            })();
        } 
        else setUserLoading(false);
    }, []);

    const logout = () => {
        localStorage.removeItem('accessToken');
        setAuthenticated(false);
        setUser({});
    }

    return (
        <AuthContext.Provider value={{
            user,
            authenticated,
            setUser,
            userLoading,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);