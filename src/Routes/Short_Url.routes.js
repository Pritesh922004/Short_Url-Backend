import express from 'express'
import { CreateShortUrl, RedirectToUrl } from '../controllers/CreateShortUrl.controller.js';
import {body , param} from 'express-validator'
import { Auth } from '../middleware/Auth.middleware.js';
import { GetAllUrls } from '../controllers/GetAllUrls.controller.js';

const route = express.Router();

route.post('/Create',
    body('url')
    .notEmpty().withMessage("URL Is Empty")
    .isURL().withMessage("Incorrect URL")
    .trim()
    ,CreateShortUrl);

route.get('/all',Auth,GetAllUrls)

export default route;