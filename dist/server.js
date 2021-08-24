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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db = require('./models');
const apiRoutes = require('./routes/apiRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.js')[env];
const app = express_1.default();
const PORT = process.env.port || 5000;
const host = process.env.host || 'localhost';
app.use(cors_1.default());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
// Routes
app.use('/auth', authRoutes);
app.use(authToken);
app.use('/api', apiRoutes);
// middleware to verify the token
function authToken(req, res, next) {
    const authHeader = req.headers['authorization']; // bearer
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.status(400).send({ msg: 'Token not found' }); // Bad Request
    }
    else {
        jsonwebtoken_1.default.verify(token, process.env.ACCESS_SECRET || '', (err) => {
            if (err)
                return res.status(401).send({ msg: `Incorrect Token ${err}` }); // unauthorized
            const Auth = req.headers.authorization;
            const token = Auth === null || Auth === void 0 ? void 0 : Auth.split(' ')[1];
            const base64URI = token.split(".")[1];
            let buff = Buffer.from(base64URI, 'base64');
            let userObj = JSON.parse(buff.toString('ascii')).user;
            req.body.userObj = userObj;
            next();
        });
    }
}
function createConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // connect
            yield db.sequelize.authenticate();
            console.log('\nConnection has been established successfully.\n');
            // Sync 
            yield db.sequelize.sync();
            app.listen(PORT, () => {
                console.log(`Listening on http://${host}:${PORT}`);
            });
        }
        catch (err) {
            console.log('\nUnable to connect to the database:', err);
        }
    });
}
createConnection()
    .then()
    .catch((err) => {
    console.log('Server not started');
});
