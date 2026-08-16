import express from "express";
import {
    AdminLogin,
    AdminVerify,
    AdminStats,
    AdminGetUsers,
    AdminDeleteUserHandler,
    AdminGetUrls,
    AdminDeleteUrlHandler,
    AdminLogout
} from "./admin.controller.js";
import { AdminAuth } from "./admin.middleware.js";

const router = express.Router();

// Public Admin Auth
router.post("/login", AdminLogin);
router.post("/signin", AdminLogin);
router.post("/logout", AdminLogout);

// Protected Admin Routes
router.get("/verify", AdminAuth, AdminVerify);
router.get("/stats", AdminAuth, AdminStats);
router.get("/users", AdminAuth, AdminGetUsers);
router.delete("/users/:id", AdminAuth, AdminDeleteUserHandler);
router.get("/urls", AdminAuth, AdminGetUrls);
router.delete("/urls/:id", AdminAuth, AdminDeleteUrlHandler);

export default router;
