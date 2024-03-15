import { Router } from "express";
import httpStatus from "http-status";
import Admin from "./Admin.js";
import passport from "passport";

const router = Router({ mergeParams: true })

//!PATH: /auth/admin

router
    .post("/register", async (req, res) => {
        try {
            const { email, phoneNumber, address, dob, doj, fullName, profilePicture } = req.body;

            if (!email || !phoneNumber || !address || !dob || !doj || !fullName) {
                return res.status(httpStatus.OK).json({ message: "Please provide all the details" });
            }

            const newAdmin = new Admin({
                email,
                phoneNumber,
                address,
                dob,
                doj,
                fullName,
                profilePicture,
            });

            await Admin.register(newAdmin, req.body.password);

            res.status(httpStatus.CREATED).json({ message: "Admin created successfully" });
        } catch (err) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
        }
    });


router
    .post("/login", passport.authenticate("admin", { failureRedirect: "/auth/error" }), (req, res) => {
        console.log(req.user instanceof Admin);


        res.status(httpStatus.OK).json({ message: "Logged in successfully" });
    });

export default router;