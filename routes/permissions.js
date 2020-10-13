const express = require('express');
const router = express.Router();


const permissionsController = require('../controllers/permissionsController');

router.get('/getPermission', permissionsController.getPermission);
router.get('/getRoles', permissionsController.getRoles);
router.get('/getRolePermission', permissionsController.getRolePermission);
router.get('/getRoleByUserId', permissionsController.getRoleByUserId);

module.exports = router;