const db = require('./db')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')
function run(){ console.log('Initializing database...')
 db.exec(`
 CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, email TEXT UNIQUE NOT NULL, password_hash TEXT NOT NULL, name TEXT, roles TEXT NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP);
 CREATE TABLE IF NOT EXISTS products (id TEXT PRIMARY KEY, title TEXT NOT NULL, description TEXT, price REAL NOT NULL, inventory INTEGER DEFAULT 0, image TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP);
 CREATE TABLE IF NOT EXISTS orders (id TEXT PRIMARY KEY, user_id TEXT, status TEXT DEFAULT 'pending', total REAL DEFAULT 0, currency TEXT DEFAULT 'USD', shipping_address TEXT, shipping_phone TEXT, payment_method TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE SET NULL);
 CREATE TABLE IF NOT EXISTS order_items (id TEXT PRIMARY KEY, order_id TEXT NOT NULL, product_id TEXT NOT NULL, title TEXT, price REAL, quantity INTEGER, FOREIGN KEY(order_id) REFERENCES orders(id) ON DELETE CASCADE, FOREIGN KEY(product_id) REFERENCES products(id));
 CREATE TABLE IF NOT EXISTS analytics_events (id TEXT PRIMARY KEY, event_type TEXT, payload TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP);
 `)
 const userCount = db.prepare('SELECT COUNT(*) AS c FROM users').get().c
 if(userCount === 0){ const insert = db.prepare('INSERT INTO users (id,email,password_hash,name,roles) VALUES (?,?,?,?,?)')
 insert.run('u-admin-1','admin@example.com',bcrypt.hashSync('adminpass',10),'Admin User','admin,consumer')
 insert.run('u-user-1','user@example.com',bcrypt.hashSync('userpass',10),'Consumer User','consumer') }
 const prodCount = db.prepare('SELECT COUNT(*) AS c FROM products').get().c
 if(prodCount === 0){ const insertP = db.prepare('INSERT INTO products (id,title,description,price,inventory,image) VALUES (?,?,?,?,?,?)')
 insertP.run('p-1','Sample Product','A placeholder product',19.99,100,'https://via.placeholder.com/600') }
 console.log('DB initialized') }
run()