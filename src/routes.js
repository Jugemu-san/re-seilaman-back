const express = require("express");

const AccountController = require("./controllers/AccountController");
const ContributionController = require("./controllers/ContributionController");

const connection = require('./database/connection');

const routes = express.Router();

routes.get("/", (request, response) => {
    return response.json({
        "message" : "ok"
    });
});
routes.post("/user", AccountController.create);
routes.get("/user", AccountController.index);

routes.post("/contribution", ContributionController.insertContribution);

module.exports = routes;