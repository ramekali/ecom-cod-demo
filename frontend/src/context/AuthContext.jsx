import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext()
export function AuthProvider({ children }){
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => { async function load(){ try{ const { data } = await api.get('/auth/me') ; setUser(data.user) }catch(e){ setUser(null) }finally{ setLoading(false) } } load() }, [])
  const login = async (email, password) => { const { data } = await api.post('/auth/login', { email, password }); setUser(data.user); return data }
  const logout = async () => { await api.post('/auth/logout'); setUser(null) }
  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext)