const express = require('express');
const { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder } = require('../controllers/orderController');
const { isAuthenticated } = require('../middleware/authMiddleware');

const router = express.Router();

// Create Order
router.post('/', isAuthenticated, createOrder);

// Get All Orders
router.get('/', isAuthenticated, getAllOrders);

// Get Order By ID
router.get('/:id', isAuthenticated, getOrderById);

// Update Order
router.put('/:id', isAuthenticated, updateOrder);

// Delete Order
router.delete('/:id', isAuthenticated, deleteOrder);

module.exports = router;