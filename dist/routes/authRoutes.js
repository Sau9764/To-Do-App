"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const router = express_1.default.Router();
// sign-up user
router.post('/sign-up', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Search isExist()
        let user = yield db.Users.findOne({ where: { username: req.body.username } });
        if (user === null) {
            const passwordHash = yield bcrypt.hashSync(req.body.password, 10);
            let userAdded = yield db.Users.create({ username: req.body.username, password: passwordHash });
            if (userAdded !== null) {
                res.status(201).send({ msg: 'User addedd.', data: { 'id': userAdded.id, 'username': userAdded.username } }); // Data save
            }
            else
                res.status(400).send({ msg: 'Something wen\'t wrong' }); // Bad Request
        }
        else {
            res.status(400).send({ msg: 'User Already Exist' }); // Bad Request
        }
    }
    catch (err) {
        res.status(503).send({ msg: `Error: ${err}` }); // Service Unavailable
    }
}));
// 2nd Time validate
router.get('/callback', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers['authorization']; // bearer
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        res.status(400).send({ msg: "Token not found" }); // Bad request
    }
    else {
        jwt.verify(token, process.env.ACCESS_SECRET, (err) => {
            if (err)
                return res.status(401).send({ msg: 'Incorrect Token' });
            res.status(200).send({ msg: 'Token Verified' });
        });
    }
}));
// validate User
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield db.Users.findOne({ where: { username: req.body.username } });
        if (user !== null) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                let token = jwt.sign({ user: user }, process.env.ACCESS_SECRET, { expiresIn: '5m' });
                res.status(200).send({ id_token: token }); // Data sent
            }
            else {
                res.status(400).send({ msg: 'Incorrect Password' }); // Bad request
            }
        }
        else {
            res.status(400).send({ msg: 'User Not Exist' }); // Bad request
        }
    }
    catch (err) {
        res.status(503).send({ msg: `Error: ${err}` }); // Service Unavailable
    }
}));
module.exports = router;
