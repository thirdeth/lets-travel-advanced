let CallbackRequest = require("../models/callback-requests.model").CallbackRequest;
let uniqid = require("uniqid");
let express = require("express");
let router = express.Router();
let authMiddleware = require("../middleware/auth");

router.get('/', authMiddleware, async (req, resp) => {
    resp.send(await CallbackRequest.find());
});

router.post('/', async (req, resp) => {
    let reqBoby = req.body;
    let newRequest = new CallbackRequest({
        id: uniqid(),
        phoneNumber: reqBoby.phoneNumber,
        date: new Date()
    });
    await newRequest.save();
    resp.send("Accepted");
});

router.delete("/:id", authMiddleware, async (req, resp) => {
    await CallbackRequest.deleteOne({id: req.params.id});
    resp.send("Deleted");
});

module.exports = router;
