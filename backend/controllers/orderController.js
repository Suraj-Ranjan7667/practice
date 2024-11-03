const Order = require('../models/order');
const User = require('../models/user');
const Shop = require('../models/shop');
const Product = require('../models/product');

// Create Order
exports.createOrder = async (req, res) => {
    try {
        const { user, shop, items } = req.body;

        // Check if user exists
        const userExists = await User.findById(user);
        if (!userExists) {
            return res.status(400).json({
                success: false,
                message: 'User  does not exist'
            });
        }

        // Check if shop exists
        const shopExists = await Shop.findById(shop);
        if (!shopExists) {
            return res.status(400).json({
                success: false,
                message: 'Shop does not exist'
            });
        }

        // Create order
        const order = await Order.create({
            user,
            shop,
            items
        });

        res.status(201).json({
            success: true,
            order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error' + error.message
        });
    }
};

// Get All Orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user').populate('shop');

        res.status(200).json({
            success: true,
            orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error' + error.message
        });
    }
};

// Get Order By ID
exports.getOrderById = async (req, res) => {
    try {
        const id = req.params.id;

        const order = await Order.findById(id).populate('user').populate('shop');

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        res.status(200).json({
            success: true,
            order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error' + error.message
        });
    }
};

// Update Order
exports.updateOrder = async (req, res) => {
    try {
        const id = req.params.id;

        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        const { status } = req.body;

        order.status = status;

        await order.save();

        res.status(200).json({
            success: true,
            order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error' + error.message
        });
    }
};

// Delete Order
exports.deleteOrder = async (req, res) => {
    try {
        const id = req.params.id;

        const order = await Order.findByIdAndDelete(id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Order deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error' + error.message
        });
    }
};