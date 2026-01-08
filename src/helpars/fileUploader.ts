import multer from "multer";
import path from "path";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import { ICloudinaryUploadResponse, IFile } from "../app/interfaces/file";

// Configuration
cloudinary.config({
  cloud_name: "dujtjqjbj",
  api_key: "865348625566696",
  api_secret: "XqFaLS2SsIbP0YTn1n6YbMBOHBE", // Click 'View API Keys' above to copy your API secret
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadToCloudinary = async (
  file: IFile
): Promise<ICloudinaryUploadResponse | undefined> => {
  // console.log(file);
  // Upload an image
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,

      (error: Error, result: ICloudinaryUploadResponse) => {
        fs.unlinkSync(file.path); // Delete the file from local uploads folder after uploading to Cloudinary
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

export const fileUploader = {
  upload,
  uploadToCloudinary,
};
