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

//app.use(cors({origin:'https://short-url-dusky-ten.vercel.app/',credentials:true},));
app.use(cors({
  origin: process.env.FRONTEND_URL.replace(/\/$/, ''),
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())


app.use(CheckUserId);
app.get('/',(req,res)=>{
    res.send("Hello World");
})
app.use("/ShortUrl",short_url);
app.use('/user',User);


app.get('/:id',
    param('id')
    .notEmpty().withMessage("ShortUrlID is Missing In ShortUrl")
    .isString().withMessage("Invalid ShortUrl")
    .trim()
    ,RedirectToUrl);
app.post('/delete',
    body('id')
    .notEmpty().withMessage("ShortUrlID is Missing In ShortUrl")
    .trim()
    ,DeleteUrls);

ConnectDB();


app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})
