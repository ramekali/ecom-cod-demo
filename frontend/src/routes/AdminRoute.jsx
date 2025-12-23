import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
export default function AdminRoute({ children }){ const { user, loading } = useAuth(); if(loading) return <div>Loading...</div>; if(!user) return <Navigate to="/login" replace />; if(!user.roles || !user.roles.includes('admin')) return <Navigate to="/" replace />; return children }