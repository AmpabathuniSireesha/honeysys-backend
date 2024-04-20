const express = require("express");
const router = express.Router();
const multer = require("multer");
const productController = require("../../controller/products_controller/products_info");
// const { maxImageSizes } = require("../../restrictions_img/imagerestrictions");

const storage = multer.diskStorage({
  destination: function (req, file, cd) {
    cd(null, "product_img/");
  },
  filename: function (req, file, cd) {
    cd(null, Date.now() + file.originalname);
  },
});
const uploads = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024, // 50 KB
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

router.post("/createproduct",uploads.single("photo"),productController.createProduct);
router.get("/getproduct", productController.getProduct);
router.get("/getProductby/:id", productController.getProductById);
router.patch("/updateproductby/:id",uploads.single("photo"),productController.updateProduct);
router.delete("/deleteproductby/:id", productController.deleteProduct);
module.exports = router;