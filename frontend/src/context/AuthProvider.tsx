import { createContext, useState, ReactNode } from 'react'

type contextProps = {
    children: ReactNode
}

type authCred = {
    useremail: String,
    roles?: number[],
    accessToken: String
}

type authPropsContext = {
    auth: authCred | null,
    setAuth: React.Dispatch<React.SetStateAction<authCred | null>>
}


const AuthContext = createContext({} as authPropsContext)


export const AuthProvider = ({ children }: contextProps) => {

    const [auth, setAuth] = useState<authCred | null>(null);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext