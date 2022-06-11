var express = require('express');
var router = express.Router();

var Settings = require('../controllers/settings.controller');

router.post('/', Settings.insertSettings);
router.get('/', Settings.getSettings)
router.patch('/', Settings.updateSettings)
router.get('/:settingId', Settings.getSingleSettingsById)
router.get('/salary/:salary', Settings.getSingleSettingsBySalary)


module.exports = router;