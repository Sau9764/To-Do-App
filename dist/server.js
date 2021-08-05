"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db = require("./models");
var apiRoutes = require("./routes/apiRoutes.js");
var app = express_1.default();
var PORT = process.env.port || 8081;
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use("/api", apiRoutes);
db.sequelize
    .authenticate()
    .then(function (err) {
    console.log('Connection has been established successfully.');
}, function (err) {
    console.log('Unable to connect to the database:', err);
});
db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("Listening on http://localhost:" + PORT);
    });
});
