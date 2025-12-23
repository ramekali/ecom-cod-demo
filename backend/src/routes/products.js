const express = require('express')
const router = express.Router()
const db = require('../db')
router.get('/', (req,res)=>{ const rows = db.prepare('SELECT id,title,description,price,inventory,image FROM products').all(); res.json({ products: rows }) })
router.get('/:id',(req,res)=>{ const p = db.prepare('SELECT id,title,description,price,inventory,image FROM products WHERE id = ?').get(req.params.id); if(!p) return res.status(404).json({ error: 'Not found' }); res.json({ product: p }) })
module.exports = router