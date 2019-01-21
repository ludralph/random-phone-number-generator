const {Router} = require('express');
const { generatePhoneNumbers, downloadPhoneNumbers} = require('../controllers')
const router = Router();

router.get('/phone-numbers/:id', downloadPhoneNumbers);

router.post('/phone-numbers', generatePhoneNumbers)

module.exports = router