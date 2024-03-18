import { Router } from "express";
import { validate } from "express-validation";
import passport from "passport";
import { registerAdmin, loginAdmin, logoutAdmin } from "./admin.controllers.js";
import { adminRegisterSchema, adminLoginSchema } from "./admin.schema.js";
import httpStatus from "http-status";
import { isAuthenticated } from "../../middlewares/middlewares.js";
const router = Router({ mergeParams: true })

//!PATH: /auth/admin

router
    .post("/register", validate(adminRegisterSchema), registerAdmin);


router
    .post("/login", validate(adminLoginSchema), passport.authenticate("admin", { failureRedirect: "/error" }), loginAdmin);

router
    .get("/logout", isAuthenticated, logoutAdmin)

export default router;