import { Router } from "express";
import { validate } from "express-validation";
import passport from "passport";
import { checkPermissions, isAuthenticated } from "../../middlewares/middlewares.js";
import { approveRequest, deleteAdmin, loginAdmin, registerAdmin, updateAdmin, updateRequestsAdmin } from "./admin.controllers.js";
import Admin from "./Admin.js";
import { adminDeleteSchema, adminLoginSchema, adminRegisterSchema, adminUpdateSchema } from "./admin.schema.js";
import { studentResetPasswordSchema } from "../Student/student.schema.js";
import { changePassword } from "../General/general.controller.js";

const router = Router({ mergeParams: true })

//!PATH: /api/admin

router
    .post("/register", validate(adminRegisterSchema, {
        keyByField: true,
    }), registerAdmin);

router
    .post("/login", validate(adminLoginSchema, { keyByField: true, }), passport.authenticate("admin", { failureRedirect: "/api/error" }), loginAdmin)
    .post("/reset-password", validate(studentResetPasswordSchema, { keyByField: true }), passport.authenticate('admin', { failureRedirect: '/api/error' }), changePassword)
    ;

router
    .get("/requests", isAuthenticated, checkPermissions(Admin), updateRequestsAdmin)
    .post("/requests/:requestId/approve", isAuthenticated, checkPermissions(Admin), approveRequest);

router
    .patch("/update/:adminId", isAuthenticated, checkPermissions(Admin), validate(adminUpdateSchema, { keyByField: true, }), updateAdmin)
    .delete("/delete/:adminId", isAuthenticated, checkPermissions(Admin), validate(adminDeleteSchema, { keyByField: true, }), deleteAdmin)    

export default router;