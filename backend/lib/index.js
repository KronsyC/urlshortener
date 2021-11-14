"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
const fastify_cookie_1 = __importDefault(require("fastify-cookie"));
const link_1 = __importDefault(require("./models/link"));
const fastify_cors_1 = __importDefault(require("fastify-cors"));
const fastify_static_1 = __importDefault(require("fastify-static"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const urlRegex = new RegExp("(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})");
dotenv.config();
const app = (0, fastify_1.default)();
app.register(fastify_cookie_1.default, {});
app.register(fastify_cors_1.default, { origin: ["http://localhost:3000", "http://localhost:3001"], credentials: true, exposedHeaders: ["set-cookie", "cookie"] });
app.register(fastify_static_1.default, {
    root: path_1.default.join(__dirname, "..", "static"),
    prefix: "/"
});
function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}
app.get("/", async (req, res) => {
    return res.sendFile("index.html");
});
app.get("/:link", async (req, res) => {
    // Redirect users
    const { link } = Object(req.params);
    link_1.default.findOne({ url: link })
        .then(data => {
        if (data === null) {
            res.header("content-type", "text/html");
            res.status(404).send("<h1>Invalid URL</h1><style>h1{font-family:sans-serif;}html{display:flex;justify-content:center;align-items:center;}</style>");
            return;
        }
        if (data.uses > 0) {
            link_1.default.findByIdAndUpdate(data._id, { $inc: { uses: -1 } })
                .then(data => { });
        }
        else if (data.uses == 0) {
            res.header("content-type", "text/html");
            res.status(400).send("<h1>Maximum uses reached</h1><style>h1{font-family:sans-serif;}html{display:flex;justify-content:center;align-items:center;}</style>");
            return;
        }
        res.redirect(data.target);
    });
});
app.post("/api/register", async (req, res) => {
    const newId = makeid(16);
    res.cookie("id", newId, { maxAge: 9999 ** 9, httpOnly: true, domain: "localhost", path: "/" });
    res.status(200).send({
        statusCode: 200,
        message: "Successfully registered"
    });
});
app.get("/api/register", async (req, res) => {
    console.log(req.cookies);
    const id = req.cookies.id || "";
    return !(id === "");
});
app.post("/api/links", async (req, res) => {
    console.log("Links");
    const { maxUses = -1, tracking = false, url = "" } = Object(req.body);
    const owner = req.cookies.id || "";
    console.log(owner);
    if (owner === "") {
        res.status(400).send({
            statusCode: 400,
            message: "You need to register to use this feature"
        });
        return;
    }
    if (url === "") {
        res.status(400).send({
            statusCode: 400,
            message: "Url not provided"
        });
        return;
    }
    if (!url.match(urlRegex)) {
        res.status(400).send({
            statusCode: 400,
            message: "Invalid URL provided"
        });
        return;
    }
    link_1.default.create({
        target: url,
        owner: owner,
        uses: maxUses,
        tracking: tracking,
        url: makeid(6)
    })
        .then(data => {
        console.log(data);
        res.status(201).send({
            statusCode: 201,
            message: "Successfully created link",
            url: data.url,
            target: data.target,
            uses: data.uses,
            tracking: data.tracking
        });
    })
        .catch(err => {
        res.status(500).send({
            statusCode: 500,
            message: "Unexpected server error",
            err
        });
    });
});
const start = async () => {
    fs_1.default.readdir(path_1.default.join(__dirname, ".."), (err, files) => {
        files.forEach(file => {
            console.log(file);
        });
    });
    try {
        app.listen(8080, "0.0.0.0");
        console.log("Server listening on port 8080");
        mongoose_1.default.connect(process.env.MONGOURL || "")
            .then(data => {
            console.log("Successfully connected to mongodb");
        })
            .catch(err => {
            console.log("Database Error");
            console.log(err);
            process.exit(1);
        });
    }
    catch (err) {
        console.log("Unexpected Error");
        console.log(err);
    }
};
start();
