const productModel = require("../../model/products_model/products_info");
const fs = require("fs");
const path=require("path");
const { maxImageSizes } = require("../../restrictions_img/image_restrictions");
const errormessages = require("../../config/errormessages");
const statusmessages = require("../../config/statusmessages");


// Create API
exports.createProduct = async (req, res) => {
  try {
   const { productname, productid, productdescription, productprice } = req.body;
    if (!productname||!productid|| !productprice||!productdescription ) {
      return res.status(400).json({
        status: statusmessages.statusFailed,
        message: errormessages.allFieldsRequired,
      });
    } 
      let imageUrl = " ";    //variable to store the image Url                                                                                                                                          
    if (req.file && req.file.filename) {
      const { filename: photoFileName } = req.file;
      // Assuming the images are served from "/product_img" route
      imageUrl = `${req.protocol}://192.168.68.132:7171/product_img/${photoFileName}`;
    }

    const productDataCreation = {
      productname,
      productid,
      productdescription,
      productprice,
      image: imageUrl,         //Set the image Url here
    };

    const savedProduct = await productModel.create(productDataCreation);

    return res.status(201).json({
      status: statusmessages.statusSuccess,
      message: "Product created successfully",
      data: savedProduct,     // Return the saved product data object
    });
  } catch (error) {
    return res.status(401).json({
      status: statusmessages.statusFailed,
      message: error.message,
    });
  }
};

// get API
exports.getProduct = async (req, res) => {
  try {
    const productData = await productModel.find({ del_flag: 0 });
    return res.status(200).json({
      status: statusmessages.statusSuccess,
      message: "Get API created successfully",
      productData,
    });
  } catch (error) {
    return res.status(500).json({
      status: statusmessages.statusFailed,
      message: error.message,
    });
  }
};

// getById API
exports.getProductById = async (req,res) => {
  try {
    const id = req.params.id;
    const productById = await productModel.findOne({_id: id, del_flag: 0 });
    if (!productById) {
      return res.status(404).json({
        status: statusmessages.statusFailed,
        message: errormessages.alreadyDeleted,
      });
    }

    return res.status(200).json({
      status: statusmessages.statusSuccess,
      message: "This is Product Data",
      productById,
    });
  } catch (error) {
    return res.status(500).json({
      status: statusmessages.statusFailed,
      message: error.message,
    });

  }
};



// Delete API

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    // Check if the product exists
    const productToDelete = await productModel.findById(id);
    if (!productToDelete) {
      return res.status(404).json({
        status: statusmessages.statusFailed,
        message: errormessages.notFound,
      });
    }

    // Check if the product is already marked as deleted
    if (productToDelete.del_flag === 1) {
      return res.status(400).json({
        status: statusmessages.statusFailed,
        message: errormessages.alreadyDeleted,
      });
    }

    // Deleting the connected image file if it exists
    if (productToDelete.image) {
      // Extracting the file name from the image URL
      const imageUrlParts = productToDelete.image.split('/');
      const fileName = imageUrlParts[imageUrlParts.length - 1];
      const imagePath = path.join(__dirname, "../../product_img/", fileName);

      // Check if the file exists before attempting to delete it
      if (fs.existsSync(imagePath)) {
        // Delete the image file
        fs.unlinkSync(imagePath);
      }
    }

    // Update the product to mark it as deleted
    const deleteProductDataById = await productModel.findByIdAndUpdate(
      id,
      { del_flag: 1 },
      { new: true }
    );

    return res.status(200).json({
      status: statusmessages.statusSuccess,
      message: "Product deleted successfully",
      deleteProductDataById
    });
  } catch (error) {
    return res.status(500).json({
      status: statusmessages.statusFailed,
      message: error.message,
    });
  }
};


// Update API
exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const findProductInfo = await productModel.findById(id);

    if (!findProductInfo) {
      return res.status(404).json({
        status:statusmessages.statusFailed,
        message: errormessages.notFound,
      });
    }

    // Check if the product is marked as deleted
    if (findProductInfo.del_flag === 1) {
      return res.status(400).json({
        status: statusmessages.statusFailed,
        message: errormessages.deletedProductUpdate,
      });
    }

    const updateData = { ...req.body };


    // Update image if provided
    if (req.file && req.file.filename) {
      const { filename: photoFileName } = req.file;
      const imageUrl = `${req.protocol}://192.168.68.132:7171/product_img/${photoFileName}`;
      updateData.image = imageUrl;

      // Delete old image file if it exists
      if (findProductInfo.image) {
        const oldImagePath = findProductInfo.image.replace(`${req.protocol}://192.168.68.132:7171`, ".");
        fs.unlinkSync(oldImagePath);
      }
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );
    
    return res.status(200).json({
      status: statusmessages.statusSuccess,
      message: "Product data updated successfully",
      updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      status: statusmessages.statusFailed,
      message: error.message,
    });
  } 
};





