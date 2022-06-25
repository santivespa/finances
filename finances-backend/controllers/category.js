const Category = require('../models/Category'); 

const getCategories = async(req, res) => {
    try {

        const { id } = req;

        const categories = await Category.find({ user: id });
    
        res.status(200).json({
            ok: true,
            categories
        })

    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
}

const addCategory = async(req, res) => {
    try {
        const { id } = req;
        const category = new Category(req.body);

        category.user = id
        const categorySaved = await category.save();

        res.status(200).json({
            ok: true,
            category: categorySaved
        });
    

    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
}

const updateCategory = async(req, res) => {
    try {

        const categoryID = req.query.categoryID;
        const { id } = req;

        const category = await Category.findById(categoryID);

        if(!category) {
            return res.status(404).json({
                ok: true,
                msg: 'Category not found'
            });
        }

        if(category.user.toString() !== id) {
            return res.status(401).json({
                ok: false,
                msg: 'No authorized'
            })
        }


        const categoryUpdated = await Category.findByIdAndUpdate(categoryID, req.body, { new: true})

        res.json({
            ok: true,
            category: categoryUpdated
        })

    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
}

const deleteCategory = async(req, res) => {
    try {

        const categoryID = req.query.categoryID;
        const { id } = req;

        const category = await Category.findById(categoryID);

        if(!category) {
            return res.status(404).json({
                ok: true,
                msg: 'Category not found'
            });
        }

        if(category.user.toString() !== id) {
            return res.status(401).json({
                ok: false,
                msg: 'No authorized'
            })
        }

        const categoryUpdated = await Category.findByIdAndDelete(categoryID);

        res.json({
            ok: true,
            msg: 'Category deleted'
        })

    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: 'Error deleting category'
        });
    }
}

module.exports = {
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory
}