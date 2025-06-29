import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from 'cors';
import { body, param } from "express-validator";
import User from "./src/Routes/User.routes.js";
import short_url from "./src/Routes/Short_Url.routes.js";
import ConnectDB from "./src/config/Connectdb.js";
import { RedirectToUrl } from "./src/controllers/CreateShortUrl.controller.js";
import { CheckUserId } from "./src/middleware/Add_User.js";
import cookieParser from "cookie-parser";
import { DeleteUrls } from "./src/controllers/DeleteUrl.controller.js";


const app = express();
const port = process.env.PORT;

app.use(cors({
    origin: [
        process.env.FRONTEND_URL.replace(/\/$/, ''),
        "https://shorturl-priteshs-projects-702bd372.vercel.app",
        "https://shorturl-git-main-priteshs-projects-702bd372.vercel.app"
    ],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use(CheckUserId);
app.get('/', (req, res) => {
    res.send("Hello World");
})
app.use("/ShortUrl", short_url);
app.use('/user', User);


app.get('/:id',
    param('id')
        .notEmpty().withMessage("ShortUrlID is Missing In ShortUrl")
        .isString().withMessage("Invalid ShortUrl")
        .trim()
    , RedirectToUrl);
app.post('/delete',
    body('id')
        .notEmpty().withMessage("ShortUrlID is Missing In ShortUrl")
        .trim()
    , DeleteUrls);

ConnectDB();


app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})
