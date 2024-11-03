const express = require('express');
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/productController');
const { isAuthenticated } = require('../middleware/authMiddleware');

const router = express.Router();

// Create Product
router.post('/', isAuthenticated, createProduct);

// Get All Products
router.get('/', getAllProducts);

// Get Product By ID
router.get('/:id', getProductById);

// Update Product
router.put('/:id', isAuthenticated, updateProduct);

// Delete Product
router.delete('/:id', isAuthenticated, deleteProduct);

module.exports = router;