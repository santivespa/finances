const { Router } = require('express');
const { getCategories, addCategory, updateCategory, deleteCategory } = require('../controllers/category');
const { validateJWT } = require('../middlewares/validateJWT');


const router = Router();

router.use(validateJWT);

router.get('/get-all', getCategories);
router.post('/add', addCategory);
router.put('/update', updateCategory);
router.delete('/delete', deleteCategory);


module.exports = router;