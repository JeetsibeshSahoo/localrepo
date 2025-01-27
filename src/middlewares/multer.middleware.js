import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log("File is being uploaded to ./public/temp");
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      console.log("File name: ", file.originalname);
      cb(null, file.originalname)
    }
  })
  
export const upload = multer({ 
    storage
})