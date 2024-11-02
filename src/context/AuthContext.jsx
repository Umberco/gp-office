import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from '../Supabase';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

async function login(email, password){
    return await supabase.auth.signInWithPassword({email, password})
}

async function logout() {
    return await supabase.auth.signOut()
}

export function AuthProvider({children}) {

    const [user, setUser] = useState(null)
    const [isAuth, setIsAuth] = useState(false)

    useEffect(
        () => {
            const {data} = supabase.auth.onAuthStateChange((e, session) => {
                if (e === "SIGNED_IN"){
                    setIsAuth(true)
                    setUser(session.user)
                }
                if (e === "SIGNED_OUT"){
                    setIsAuth(false)
                    setUser(null)
                }
            })

            return () => {
                data.subscription.unsubscribe()
            }
        }
    )

    return(
        <AuthContext.Provider value={{
            user, 
            isAuth,
            login,
            logout
            }}>
            {children}
        </AuthContext.Provider>
    )
}