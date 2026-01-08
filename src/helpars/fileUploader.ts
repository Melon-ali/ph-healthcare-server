import multer from "multer";
import path from "path";

import { v2 as cloudinary } from "cloudinary";

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

const uploadToCloudinary = async (file: string) => {
// Upload an image
cloudinary.uploader.upload(
  "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
  {
    public_id: "shoes",
  },
  function (error, result) {
    console.log(result);
  }
);
};

export const fileUploader = {
    upload,
    uploadToCloudinary,
}