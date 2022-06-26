const Sheet = require('../models/Sheet');
const SheetItem = require('../models/SheetItem');

const addItem = async (req, res) => {

    const item = new SheetItem(req.body);
    item.sheet = req.query.sheetID;
    item.category = req.query.categoryID;

    try {

        let itemSaved = await item.save();
    
    
        let itemPopulate = await SheetItem.find({ _id: itemSaved._id }).populate("category");
        res.status(201).json({
            ok: true,
            item: itemPopulate[0]
        });


    } catch(err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Error adding sheet item'
        })
    }
}

const updateItem = async (req, res) => {

    const itemID = req.query.itemID;

    const uid = req.id;

    console.log(req.body.categoryID);
    try {

        const item = await SheetItem.findById( itemID ).populate('sheet');

        if(!item) {
            return res.status(404).json({
                ok: false,
                msg: 'Sheet item not found'
            })
        }

        const sheet = await Sheet.findById( item.sheet.id );

        if(sheet.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No authorized'
            })
        }

        const itemUpdated = await SheetItem.findByIdAndUpdate(itemID, req.body, { new: true }).populate("category");;
  
        res.json({
            ok: true,
            item: itemUpdated
        })

    } catch(err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Error updating sheet item'
        })
    }
}

const deleteItem = async (req, res) => {
    const itemID = req.query.itemID;
    const uid = req.id;
    try {

        const item = await SheetItem.findById( itemID );

        if(!item) {
            return res.status(404).json({
                ok: false,
                msg: 'Sheet item not found'
            })
        }

        const sheet = await Sheet.findById( item.sheet );

        if(sheet.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No authorized'
            })
        }

         await SheetItem.findByIdAndDelete(itemID);

        res.json({
            ok: true
        })

    } catch(err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Error deleting sheet item'
        })
    }
}

const getItems = async (req, res) => {

    const sheetID = req.query.sheetID;
    const uid = req.id;
    try {

        const sheet = await Sheet.findById( sheetID );
        
        if(!sheet) {
            return res.status(404).json({
                ok: false,
                msg: 'Sheet not found'
            })
        }
        
        if(sheet.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No authorized'
            })
        }
        
     
       const items = await SheetItem.find({ sheet: sheetID }).populate("category");

        res.json({
            ok: true,
            items
        })


    } catch(err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Error getting sheet item'
        })
    }
}

module.exports = {
    addItem,
    updateItem,
    deleteItem,
    getItems
}