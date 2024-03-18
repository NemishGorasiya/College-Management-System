import { Router } from "express";
import { validate } from "express-validation";
import passport from "passport";
import { loginAdmin, registerAdmin } from "./admin.controllers.js";
import { adminLoginSchema, adminRegisterSchema } from "./admin.schema.js";
const router = Router({ mergeParams: true })

//!PATH: /admin

router
    .post("/register", validate(adminRegisterSchema, {
        keyByField: true,
    }), registerAdmin);

router
    .post("/login", validate(adminLoginSchema, {
        keyByField: true,
    }), passport.authenticate("admin", { failureRedirect: "/error" }), loginAdmin);


export default router;