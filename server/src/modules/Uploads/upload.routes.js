import { Router } from "express";
import multer, { diskStorage, memoryStorage } from "multer";
import { isAuthenticated } from "../../middlewares/middlewares.js";
import { uploadHandler } from "./upload.controller.js";

const router = Router({ mergeParams: true });

const upload = multer({
    limits: {
        fileSize: 10000000, //10mb,
    },
    storage: memoryStorage(),
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image") || file.mimetype.startsWith("video") || file.mimetype.endsWith("pdf") || file.mimetype.endsWith("json") || file.mimetype.endsWith("csv")) {
            cb(null, true);
        } else {
            cb(new Error("File type not supported"));
        }
    },
});

//!Path - /uploads/

router
    .post("/images", isAuthenticated, upload.single("image"), uploadHandler)
    .post("/files", isAuthenticated, upload.single("file"), uploadHandler)

export default router;