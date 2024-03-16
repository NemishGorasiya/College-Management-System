import { Router } from "express";
import httpStatus from "http-status";
import Admin from "./Admin.js";
import passport from "passport";
import { registerAdmin } from "./admin.controllers.js";
import { validate } from "express-validation";
import { adminSchema } from "./admin.schema.js";
const router = Router({ mergeParams: true })

//!PATH: /auth/admin

router
    .post("/register", validate(adminSchema), registerAdmin);


router
    .post("/login", passport.authenticate("admin", { failureRedirect: "/auth/error" }), (req, res) => {
        console.log(req.user instanceof Admin);


        res.status(httpStatus.OK).json({ message: "Logged in successfully" });
    });

export default router;