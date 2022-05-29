

const { Router } = require('express');
const { getSheets , addSheet, deleteSheet, updateSheet, lastRemainingAmount} = require('../controllers/sheets');
const { validateJWT } =require('../middlewares/validateJWT');
const router = Router();

router.use(validateJWT);

router.get('/get-all', getSheets);

router.get('/last-remaining-amount', lastRemainingAmount);

router.post('/add', addSheet);

router.delete('/delete', deleteSheet);

router.put('/update', updateSheet);


module.exports = router;