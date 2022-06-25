
const Sheet  = require('../models/Sheet');
const SheetItem = require('../models/SheetItem');

const getSheets = async (req, res) => {

    const { id } = req;

    try {

        const sheets = await Sheet.find({ user: id });

        res.status(200).json({
            ok: true,
            sheets
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
}

const addSheet = async(req, res) => {

    const sheet = new Sheet(req.body);
    sheet.user = req.id;

    try {

        const sheetSaved = await sheet.save();

        const sheetItem = new SheetItem({
            description: '',
            type: 'adjustment',
            amount: 0,
            sheet: sheetSaved._id
        });

        await sheetItem.save();

        res.status(201).json({
            ok: true,
            sheet: sheetSaved
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
}

const updateSheet = async (req, res) => {

    const sheetID = req.query.id;
    const id = req.id;

    try {
        const sheet = await Sheet.findById( sheetID );

        if(!sheet) {
            return res.status(404).json({
                ok: false,
                msg: 'Sheet not found'
            })
        }

        if(sheet.user.toString() !== id) {
            return res.status(401).json({
                ok: false,
                msg: 'No authorized'
            })
        }

        const sheetUpdated = await Sheet.findByIdAndUpdate(sheetID, req.body, { new: true });

        res.json({
            ok: true, 
            msg: 'Sheet updated',
            sheetUpdated
        });

    } catch(err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Error update sheet'
        });
    }

}

const deleteSheet = async (req, res) => {
    const sheetID = req.query.id;
    const id = req.id;

    try {
        const sheet = await Sheet.findById( sheetID );

        if(!sheet) {
            return res.status(404).json({
                ok: false,
                msg: 'Sheet not found'
            })
        }

        if(sheet.user.toString() !== id) {
            return res.status(401).json({
                ok: false,
                msg: 'No authorized'
            })
        }

        await Sheet.findByIdAndDelete(sheetID);

        res.json({
            ok: true, 
            msg: 'Sheet deleted'
        });

    } catch(err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Error delete sheet'
        });
    }
}

const lastRemainingAmount = async(req, res) => {


    const uid = req.id;
    try {

        const sheets = await Sheet.find({ user: uid });

        if(sheets.length > 0) {

            const lastSheet = sheets[sheets.length - 1];

            const items = await SheetItem.find({ sheet: lastSheet._id });

            const sumAmounts = items.reduce((accumulator, { amount }) => {
                return Number(accumulator) + Number(amount);
            }, 0);
            const remainingAmount = lastSheet.initialAmount - sumAmounts;

            return res.json({
                ok: true,
                remainingAmount: remainingAmount
            })
        }


    } catch(err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Error getting last remaining amount'
        });
    }

    res.json({
        ok: true,
        remainingAmount: 0
    })
}

module.exports = {
    getSheets,
    addSheet,
    updateSheet,
    deleteSheet,
    lastRemainingAmount
}