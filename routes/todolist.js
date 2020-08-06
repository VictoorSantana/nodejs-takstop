
var express = require('express');
var router = express.Router();

const { validateTokenGetUser, validateTokenAlsoGetUser } = require('../filters/validation');
const { todolistSchema } = require('../validation_schemas/schema');

const service = require('../services/todoService');


router.get('/all', validateTokenGetUser(), async (req, res) => {

    const decoded = req.decoded;
    const result = await service.getAllTasks(decoded);
    res.json(result);   

});


router.get('/status/:status', validateTokenGetUser(), async(req,res) => {

    const decoded = req.decoded;
    const result = await service.findTask(decoded, req.params.status);
    res.json(result);  

}); 


router.post('/', validateTokenAlsoGetUser(todolistSchema), async (req, res) => {

    const decoded = req.decoded;
    console.log(decoded);
    const result = await service.setTask(req.body.title, req.body.about, decoded);
    res.json(result);

});

router.put('/id/:id/status/:status', validateTokenGetUser(), async (req, res) => {

    const decoded = req.decoded;
    const result = await service.setStatus(decoded, req.params.id, req.params.status);
    res.json(result);

});

module.exports = router;
