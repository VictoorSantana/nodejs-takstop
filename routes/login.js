

var express = require('express');
var router = express.Router();


const { validateBody, validateTokenGetUser } = require('../filters/validation');
const { loginSchema } = require('../validation_schemas/schema');

const srv = require('../services/credentialsService');

router.post('/', validateBody(loginSchema), async function(req, res) {
    
    const result = await srv.verify(req.body.username, req.body.password);
    res.json(result);

});


router.post('/whoiam', validateTokenGetUser(), async function(req, res) {

    const decoded = req.decoded;
    const result = await srv.getUsername(decoded);
    res.json(result);

});


module.exports = router;