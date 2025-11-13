const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (images)
app.use('/images', express.static(path.join(__dirname, 'images')));

// Load products data
const loadProducts = () => {
  const data = fs.readFileSync(path.join(__dirname, 'products.json'), 'utf8');
  return JSON.parse(data);
};

// GET all products
app.get('/api/products', (req, res) => {
  try {
    const products = loadProducts();
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET product by code
app.get('/api/products/:code', (req, res) => {
  try {
    const products = loadProducts();
    const product = products.find(p => p.product_code === req.params.code);
    
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET product cost sheet
app.get('/api/products/:code/cost-sheet', (req, res) => {
  try {
    const products = loadProducts();
    const product = products.find(p => p.product_code === req.params.code);
    
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    
    res.json({ success: true, data: product.cost_sheet });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET product export details
app.get('/api/products/:code/export-details', (req, res) => {
  try {
    const products = loadProducts();
    const product = products.find(p => p.product_code === req.params.code);
    
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    
    res.json({ success: true, data: product.export_details });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET product image
app.get('/api/products/:code/image', (req, res) => {
  try {
    const products = loadProducts();
    const product = products.find(p => p.product_code === req.params.code);
    
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    
    res.json({ 
      success: true, 
      data: { 
        image_path: product.image,
        image_url: `/images/${req.params.code}.png`
      } 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Product API',
    endpoints: {
      'GET /api/products': 'Get all products',
      'GET /api/products/:code': 'Get product by code',
      'GET /api/products/:code/cost-sheet': 'Get product cost sheet',
      'GET /api/products/:code/export-details': 'Get product export details',
      'GET /api/products/:code/image': 'Get product image info',
      'GET /images/:filename': 'Access product images'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
