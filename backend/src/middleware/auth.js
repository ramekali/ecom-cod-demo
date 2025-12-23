const db = require('../db')
function ensureAuthenticated(req,res,next){ if(req.session && req.session.user) return next(); return res.status(401).json({ error: 'Unauthorized' }) }
function ensureAdmin(req,res,next){ if(!req.session||!req.session.user) return res.status(401).json({ error: 'Unauthorized' }); const roles = (req.session.user.roles||'').split(',').map(r=>r.trim()); if(roles.includes('admin')) return next(); return res.status(403).json({ error: 'Forbidden' }) }
module.exports = { ensureAuthenticated, ensureAdmin }