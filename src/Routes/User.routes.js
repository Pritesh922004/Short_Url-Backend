import express from 'express'
import { body } from 'express-validator';
import {Signup} from '../controllers/signup.controller.js';
import { SignIn } from '../controllers/signin.controller.js';
import { VerifyUser } from '../controllers/VerifyUser.controller.js';
import { Auth } from '../middleware/Auth.middleware.js';
import { SignOutUser } from '../controllers/SignOutUser.controller.js';

const route = express();

route.post('/signup',
    body('name')
        .notEmpty().withMessage("Name is required")
        .isString().withMessage("Name should be a string")
        .trim()
        .isLength({ min: 3 }).withMessage("Name should be at least 3 characters")
        .isLength({ max: 20 }).withMessage("Name should be at most 20 characters"),
    body('email')
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid Email")
        .trim(),
    body('password')
        .notEmpty().withMessage("Password is required")
        .isString().withMessage("Password should be a string")
        .trim()
        .isLength({ min: 6 }).withMessage("Password should be at least 6 characters")
    ,Signup);

route.post('/signin',
    body('email')
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid Email")
    .trim(),
    body('password')
    .notEmpty().withMessage("Password is required")
    .isString().withMessage("Password should be a string")
    .trim()
    ,SignIn);

route.get('/verify',Auth,VerifyUser);
route.get('/signout',Auth,SignOutUser);

export default route;