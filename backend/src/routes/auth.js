const express = require('express')
const router = express.Router()
const db = require('../db')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')
router.post('/login', async (req,res)=>{ const { email, password } = req.body; if(!email||!password) return res.status(400).json({ error: 'Missing' }); const user = db.prepare('SELECT id,email,password_hash,name,roles FROM users WHERE email = ?').get(email); if(!user) return res.status(401).json({ error: 'Invalid' }); const ok = await bcrypt.compare(password, user.password_hash); if(!ok) return res.status(401).json({ error: 'Invalid' }); req.session.user = { id: user.id, email: user.email, name: user.name, roles: user.roles }; return res.json({ user: req.session.user }) })
router.post('/logout',(req,res)=>{ req.session.destroy(()=>{ res.clearCookie(process.env.SESSION_COOKIE_NAME||'sid'); res.json({ ok: true }) }) })
router.get('/me',(req,res)=>{ if(!req.session||!req.session.user) return res.status(401).json({ error: 'Not authenticated' }); return res.json({ user: req.session.user }) })
module.exports = router