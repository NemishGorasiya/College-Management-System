import { Router } from "express";
import { validate } from "express-validation";
import passport from "passport";
import { loginAdmin, registerAdmin, updateAdmin } from "./admin.controllers.js";
import { adminLoginSchema, adminRegisterSchema, adminUpdateSchema, adminDeleteSchema } from "./admin.schema.js";
import { checkPermissions, isAuthenticated } from "../../middlewares/middlewares.js";
import Admin from "./Admin.js";
const router = Router({ mergeParams: true })

//!PATH: /api/admin

router
    .post("/register", validate(adminRegisterSchema, {
        keyByField: true,
    }), registerAdmin);

router
    .post("/login", validate(adminLoginSchema, { keyByField: true, }), passport.authenticate("admin", { failureRedirect: "/api/error" }), loginAdmin);

router
    .use(isAuthenticated, checkPermissions(Admin),);

router
    .patch("/update/:adminId", isAuthenticated, checkPermissions(Admin), validate(adminUpdateSchema, { keyByField: true, }), updateAdmin)
    .delete("/delete/:adminId", isAuthenticated, checkPermissions(Admin), validate(adminDeleteSchema, { keyByField: true, }),);


export default router;