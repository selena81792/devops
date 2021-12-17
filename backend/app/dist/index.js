"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./database/database");
dotenv_1.default.config();
const app = express_1.default();
const corsOptions = {
    origin: "*",
};
app.use(cors_1.default(corsOptions));
app.get("/", (req, res) => {
    database_1.Kitten.find((err, kittens) => {
        res.send(kittens);
    });
});
app.get("/add/:name", (req, res) => {
    const silence = new database_1.Kitten({ name: req.params.name });
    silence.save();
    res.send(silence);
});
app.get("/cleanup", (req, res) => {
    database_1.Kitten.deleteMany({}, (err) => {
        if (err)
            console.error(err);
    });
    res.send("Done");
});
const APP_PORT = 8080;
// start the Express server
app.listen(APP_PORT, () => {
    database_1.connect();
    console.log(`server started at http://localhost:${process.env.SERVER_PORT || APP_PORT}`);
});
//# sourceMappingURL=index.js.map