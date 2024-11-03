const express = require('express');
const { createShop, getAllShops, getShopById, updateShop, deleteShop } = require('../controllers/shopcontroller');
const { isAuthenticated } = require('../middleware/authMiddleware');

const router = express.Router();

// Create Shop
router.post('/', isAuthenticated, createShop);

// Get All Shops
router.get('/', getAllShops);

// Get Shop By ID
router.get('/:id', getShopById);

// Update Shop
router.put('/:id', isAuthenticated, updateShop);

// Delete Shop
router.delete('/:id', isAuthenticated, deleteShop);

module.exports = router;