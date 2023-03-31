const Router = require('express');
const router = new Router();
const routerUser = require('./userRouter');
const routerBrand = require('./brandRouter');
const routerType = require('./typeRouter');
const routerDevice = require('./deviceRouter');
const routerBasket = require('./basketRouter');

router.use('/user', routerUser);
router.use('/brand', routerBrand);
router.use('/type', routerType);
router.use('/device', routerDevice);
router.use('/basket', routerBasket);

module.exports = router;