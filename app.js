const express = require('express');
const app = express();
app.use(express.json());

const products = [
  { id: 1, name: 'Laptop', price: 1500 },
  { id: 2, name: 'Phone', price: 500 },
  { id: 3, name: 'TV', price: 800 },
];

// CRUD Operasyonları

// Ürün Listesi (Read)
app.get('/products', (req, res) => {
  res.send(products);
});

// Ürün Detayı (Read)
app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send('Product not found');
  res.send(product);
});

// Ürün Ekle (Create)
app.post('/products', (req, res) => {
  const product = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price,
  };
  products.push(product);
  res.send(product);
});

// Ürün Güncelle (Update)
app.put('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send('Product not found');

  product.name = req.body.name;
  product.price = req.body.price;
  res.send(product);
});

// Ürün Sil (Delete)
app.delete('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send('Product not found');

  const index = products.indexOf(product);
  products.splice(index, 1);
  res.send(product);
});

// Server Başlatma
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
