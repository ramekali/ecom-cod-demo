import React, { useEffect, useState } from 'react'
import api from '../services/api'
import ProductCard from '../components/ProductCard'
export default function Home(){ const [products, setProducts] = useState([])
  useEffect(()=>{ async function load(){ try{ const { data } = await api.get('/products'); setProducts(data.products||[]) }catch(e){ console.error(e) } } load() },[])
  return (<div><h1>Products</h1><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:12}}>{products.map(p=> <ProductCard key={p.id} product={p} />)}</div></div>)}