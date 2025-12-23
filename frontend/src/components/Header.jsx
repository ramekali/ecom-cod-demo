import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
export default function Header(){ const { user, logout } = useAuth(); return (
  <header style={{background:'#fff',padding:'0.75rem',boxShadow:'0 1px 2px rgba(0,0,0,0.05)'}}>
    <div className="container" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <Link to="/" style={{fontWeight:600}}>Ecom COD</Link>
      <nav>
        <Link to="/cart" style={{marginRight:12}}>Cart</Link>
        {user ? (<><span style={{marginRight:8}}>Hi, {user.name||user.email}</span><button onClick={logout}>Logout</button></>) : (<Link to="/login">Login</Link>)}
      </nav>
    </div>
  </header>
)}