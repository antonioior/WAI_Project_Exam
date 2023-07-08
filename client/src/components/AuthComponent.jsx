import { createContext, useContext, useEffect, useState } from "react"
import {getSession, login, logout} from "../API"

const AuthContext = createContext({
  user: null,
  logout: () => new Promise(() => null),
  login: () => new Promise(() => null),
})

export function AuthProvider({ ...props }) {
  const [user, setUser] = useState(null)
  const authLogin = async (userData) => {
    const data = await login(userData)
    if (data?.error) return data
    setUser(data)
    return data
  }

  useEffect(() => {
    Promise.all([getSession()]).then((data) => {
      if (data[0]?.error) setUser(null);
      else setUser(data[0]);
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        logout: () => logout().then(() => setUser(null)),
        login: (userData) => authLogin(userData),
      }}
      {...props}
    />
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}