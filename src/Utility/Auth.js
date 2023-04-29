import React, {useEffect, useState} from "react";
import App from "../App";

export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
    const [currentuser,setCurrentUser] = useState(null);

    useEffect(() => {
        App.auth().onAuthStateChanged(setCurrentUser)
    },[]);

    return(
        <AuthContext.Provider value={{currentuser}}>
            {children}
        </AuthContext.Provider>
    );
};