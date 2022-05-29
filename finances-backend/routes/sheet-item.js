
const { Router } = require('express');
const { deleteItem, getItems, addItem, updateItem } = require('../controllers/sheet-items');
const { validateJWT } = require('../middlewares/validateJWT');

const router = Router();

router.use(validateJWT);

router.post('/add', addItem);

router.get('/get-all', getItems)

router.put('/edit', updateItem);

router.delete('/delete', deleteItem);

module.exports = router;