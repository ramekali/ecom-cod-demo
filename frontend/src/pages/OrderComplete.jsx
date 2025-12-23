import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api'
export default function OrderComplete(){ const { id } = useParams(); const [order,setOrder]=useState(null); useEffect(()=>{ async function load(){ try{ const { data } = await api.get(`/orders/${id}`); setOrder(data.order) }catch(e){ console.error(e) } } if(id) load() },[id]); if(!order) return <div>Loading...</div>; return (<div><h1>Order Confirmed</h1><p>Order ID: {order.id}</p><p>Total: ${order.total}</p></div>)}