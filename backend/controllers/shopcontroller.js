const Shop = require('../models/shop');
const User = require('../models/user');

// Create Shop
exports.createShop = async (req, res) => {
    try {
        const { name, description, address, contact, businessHours, owner } = req.body;

        // Check if owner exists
        const ownerExists = await User.findById(owner);
        if (!ownerExists) {
            return res.status(400).json({
                success: false,
                message: 'Owner does not exist'
            });
        }

        // Create shop
        const shop = await Shop.create({
            name,
            description,
            address,
            contact,
            businessHours,
            owner
        });

        res.status(201).json({
            success: true,
            shop
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error' + error.message
        });
    }
};

// Get All Shops
exports.getAllShops = async (req, res) => {
    try {
        const shops = await Shop.find().populate('owner');

        res.status(200).json({
            success: true,
            shops
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error' + error.message
        });
    }
};

// Get Shop By ID
exports.getShopById = async (req, res) => {
    try {
        const id = req.params.id;

        const shop = await Shop.findById(id).populate('owner');

        if (!shop) {
            return res.status(404).json({
                success: false,
                message: 'Shop not found'
            });
        }

        res.status(200).json({
            success: true,
            shop
        });
    } catch (error) {
        res.status(500).json ({
            success: false,
            message: 'Server Error' + error.message
        });
    }
};

// Update Shop
exports.updateShop = async (req, res) => {
    try {
        const id = req.params.id;

        const shop = await Shop.findById(id);

        if (!shop) {
            return res.status(404).json({
                success: false,
                message: 'Shop not found'
            });
        }

        const { name, description, address, contact, businessHours } = req.body;

        shop.name = name;
        shop.description = description;
        shop.address = address;
        shop.contact = contact;
        shop.businessHours = businessHours;

        await shop.save();

        res.status(200).json({
            success: true,
            shop
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error' + error.message
        });
    }
};

// Delete Shop
exports.deleteShop = async (req, res) => {
    try {
        const id = req.params.id;

        const shop = await Shop.findByIdAndDelete(id);

        if (!shop) {
            return res.status(404).json({
                success: false,
                message: 'Shop not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Shop deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error' + error.message
        });
    }
};