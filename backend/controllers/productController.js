const Product = require('../models/product');
const Shop = require('../models/shop');

// Create Product
exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, shop } = req.body;

        // Check if shop exists
        const shopExists = await Shop.findById(shop);
        if (!shopExists) {
            return res.status(400).json({
                success: false,
                message: 'Shop does not exist'
            });
        }

        // Create product
        const product = await Product.create({
            name,
            description,
            price,
            shop
        });

        res.status(201).json({
            success: true,
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error' + error.message
        });
    }
};

// Get All Products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('shop');

        res.status(200).json({
            success: true,
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error' + error.message
        });
    }
};

// Get Product By ID
exports.getProductById = async (req, res) => {
    try {
        const id = req.params.id;

        const product = await Product.findById(id).populate('shop');

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error' + error.message
        });
    }
};

// Update Product
exports.updateProduct = async (req, res) => {
    try {
        const id = req.params.id;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        const { name, description, price } = req.body;

        product.name = name;
        product.description = description;
        product.price = price;

        await product.save();

        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error' + error.message
        });
    }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error' + error.message
        });
    }
};