import productModel from "../Model/productModel.js";
import fs from "fs";
import slugify from "slugify";
import braintree from "braintree";
import orderModel from "../Model/orderModel.js";
import dotenv from "dotenv";

dotenv.config();
//Payment Gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});


//Create PRoduct Controller
export const createProductController = async (req, res) => {
  try {
    const { name, description, price, quantity, shipping } = req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.send({ message: "Name is required" });
      case !description:
        return res.send({ message: "Description is required" });
      case !price:
        return res.send({ message: "Price is required" });
      case !quantity:
        return res.send({ message: "Quantity is required" });
      case photo && photo > 1000000:
        return res.send({
          message: "Photo is required & should be less than 1MB",
        });
    }
    const slug = req.fields.slug || slugify(name);
    //making copy
    const products = new productModel({ ...req.fields, slug });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully!",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error with Creating Product",
      error,
    });
  }
};

export const getProductController = async (req, res) => {
  try {
    const product = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      countTotal: product.length,
      message: "All Products Successfully!",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error with Getting Product",
      error,
    });
  }
};

//
export const getSingleProduct = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category"); //slug here cause we pass /:slug on productRoute
    res.status(200).send({
      success: true,
      message: "Single Products!",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error with Getting Single Product",
      error,
    });
  }
};

//get photo
export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
      //or .send(product.photo.data)
      // .send({
      //   success:true,
      //   message:"Single Products Photo!",
      //   product,
      // })
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error with Getting Product Photo",
      error,
    });
  }
};

//deleteProductController
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Delete Successfully! ",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error with Delete Product",
      error,
    });
  }
};

//Update
export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, quantity, shipping } = req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.send({ message: "Name is required" });
      case !description:
        return res.send({ message: "Description is required" });
      case !price:
        return res.send({ message: "Price is required" });
      case !quantity:
        return res.send({ message: "Quantity is required" });
      case photo && photo > 1000000:
        return res.send({
          message: "Photo is required & should be less than 1MB",
        });
    }

    //making copy + updating

    const slug = req.fields.slug || slugify(name);
    //making copy
    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully!",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error with Updating Product",
      error,
    });
  }
};

export const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    //initializing objetcs || dynamix object
    let args = {};
    //making new object and passing value to checked
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Filtering Products",
      error,
    });
  }
};

export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Retrieving Product Count",
      error,
    });
  }
};

export const productListController = async (req, res) => {
  try {
    const perPage = 12;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Products List",
      error,
    });
  }
};
//Similar product
export const similarProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid }, // Exclude the current product
      })
      .select("-photo")
      .limit(4)
      .populate("category"); // Use lowercase "category" instead of "Category"

    res.status(200).send({
      success: true,
      message: "Similar Products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error With Similar Products",
      error,
    });
  }
};

// Payment || token
export const braintreeController = async (req, res) => {
  try {
    // Generate a client token using the Braintree gateway
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        // If there is an error during token generation, send a 500 Internal Server Error response
        res.status(500).send(err);
      } else {
        // If successful, send a JSON response with the generated client token
        res.status(200).json({ clientToken: response.clientToken });
      }
    });
  } catch (error) {
    // Handle any unexpected errors during the try block
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

// Payment GateWay
export const braintreePaymentController = async (req, res) => {
  try {
    // Extract necessary data from the request body
    const { cart, nonce } = req.body;

    // Calculate the total amount from the items in the cart
    let total = 0;
    cart.forEach((item) => {
      total += item.price;
    });

    // Perform a transaction using the Braintree gateway
    gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          // If the transaction is successful, create an order in the database
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();

          // Send a JSON response indicating success
          res.json({ ok: true });
        } else {
          // If there is an error in the transaction, send a 500 Internal Server Error response with details of the error
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    // Handle any unexpected errors during the try block
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
