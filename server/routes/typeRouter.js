const Router = require('express');
const router = new Router();
const typeController = require('../controllers/typeController');
const checkRole = require('../middlewares/checkRoleMiddleware');

router.post('/', checkRole(['ADMIN', 'MODERATOR']), typeController.create);
router.get('/', typeController.getAll);

module.exports = router;