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
exports.Kitten = exports.disconnect = exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// import { UserModel } from "./users/users.model";
let database;
exports.connect = () => {
    const username = process.env.MONGO_USERNAME;
    const password = process.env.MONGO_PASSWORD;
    const dbname = process.env.MONGO_DATABASE;
    const host = process.env.MONGO_HOST || "localhost";
    const port = process.env.MONGO_PORT || 27017;
    const uri = `mongodb://${username}:${password}@${host}:${port}/${dbname}?authSource=admin`;
    if (database) {
        return;
    }
    mongoose_1.default.connect(uri, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
    database = mongoose_1.default.connection;
    database.once("open", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Connected to database");
    }));
    database.on("error", () => {
        console.log("Error connecting to database");
    });
};
exports.disconnect = () => {
    if (!database) {
        return;
    }
    mongoose_1.default.disconnect();
};
const kittySchema = new mongoose_1.default.Schema({
    name: String
});
const Kitten = mongoose_1.default.model('Kitten', kittySchema);
exports.Kitten = Kitten;
//# sourceMappingURL=database.js.map