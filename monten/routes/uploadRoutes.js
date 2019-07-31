const express = require("express");
const path = require("path");
const uuidv4 = require("uuid/v4");
const multer = require("multer");
const uploadRouter = express.Router();
const uploadController = require("../controllers/upload.controller");
const passport = require("passport");
const passportService = require("../services/passport");

const requireAuth = passport.authenticate("jwt", { session: false });

const multerConfig = {
  storage: multer.diskStorage({
    destination: (req, file, next) => {
      // we create the uploads folder in the directory
      next(null, "./uploads");
    },

    filename: (req, file, next) => {
      const newFileName = `${uuidv4()}${path.extname(file.originalname)}`;
      next(null, newFileName);
    }
  }),
  // middleware to check if the filetype is the text/csv
  fileFilter: (req, file, next) => {
    if (!file) {
      next();
    }
    const csv = file.mimetype.startsWith("text/");
    if (csv) {
      next(null, true);
    } else {
      //super important to know what with middleware some will serve the file or some will
      // pass it on to the router. In which case you will have to handle it yourself.
      next({ message: "File type not supported" }, false);
    }
  }
};

const upload = multer(multerConfig);

uploadRouter.post(
  "/api/upload",
  requireAuth,
  upload.single("selectedFile"),
  uploadController.upload
);

module.exports = uploadRouter;
