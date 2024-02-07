import JWT from "jsonwebtoken";
import userModel from "../Model/userModel.js";

//protecting Route token base
export const requireSignIn = async (req, res, next) => {
  try {
    //decrpty
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode; //excrpt
    next();
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      message: "requireSignINMiddleWare Error"
    })
  }
};

//Admin Access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "middleware error in isAdmin",
    });
  }
};
