const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basketController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, basketController.createBasketDevice);
router.get('/delete', basketController.deleteBasketDevice);
router.get('/', basketController.getDevices);

module.exports = router;