"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const typescript_rest_1 = require("typescript-rest");
const Routes = require("./controller/AtendimentoController");
let app = express();
typescript_rest_1.Server.apply(Routes);
typescript_rest_1.Server.buildServices(app);
app.listen(4200, function () {
    console.log('Rest Server listening on port 4200!');
});
