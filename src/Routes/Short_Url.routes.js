import express from 'express';
import { CreateShortUrl } from '../controllers/CreateShortUrl.controller.js';
import { body } from 'express-validator';
import { Auth } from '../middleware/Auth.middleware.js';
import { GetAllUrls } from '../controllers/GetAllUrls.controller.js';

const route = express.Router();

route.post('/Create',
    body('url')
        .notEmpty().withMessage("URL is required")
        .trim()
        .custom((value) => {
            if (!value) throw new Error("URL is required");
            try {
                const hasProtocol = /^https?:\/\//i.test(value);
                const urlToCheck = hasProtocol ? value : 'https://' + value;
                const parsed = new URL(urlToCheck);
                if (!parsed.hostname || (!parsed.hostname.includes('.') && parsed.hostname !== 'localhost')) {
                    throw new Error("Invalid URL domain");
                }
                return true;
            } catch (e) {
                throw new Error("Incorrect URL format");
            }
        })
    , CreateShortUrl);


route.get('/all', Auth, GetAllUrls);

export default route;