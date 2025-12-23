import React from 'react'
import { Link } from 'react-router-dom'
export default function ProductCard({ product }){ return (
  <div style={{background:'#fff',padding:12,borderRadius:6}}>
    <img src={product.image||'https://via.placeholder.com/300'} alt={product.title} style={{width:'100%',height:160,objectFit:'cover',borderRadius:4}} />
    <h3>{product.title}</h3>
    <p>${product.price}</p>
    <Link to={`/product/${product.id}`}>View</Link>
  </div>
)}