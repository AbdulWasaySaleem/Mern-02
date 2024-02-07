import slugify from "slugify";
import categoryModel from "../Model/categoryModel.js";

export const createCategoryController = async (req, res) => {
  try {
    //data from body 
    const { name } = req.body;
    //validation
    if (!name) {
      return res.status(401).send({
        message: "Name is required",
      });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory)
      return res
        .status(200)
        .send({ success: true, message: "Category already exits" });
    //Creating new instance(instance is a blueprint of object) and saving
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    //All done!
    res.status(201).send({
      success: true,
      message: "New Category added!..",
      category,
    });
    //If Error
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error with createCategory",
      error,
    });
  }
};

//Update
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id, // ID of the category to update
      { name, slug: slugify(name) }, // Fields to update
      { new: true } // Return the modified document
    );
    res.status(200).send({
      success: true,
      message: "Category Updated successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error with UpdateCategory",
      error,
    });
  }
};
//get all
export const categoryController = async (req, res) => {
  try {
    //.find => find all thign present on DB
    const category = await categoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All Category List!...",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error with Get Category",
      error,
    });
  }
};

//Get single
export const singlecategory = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Single Category List!...",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error with Single Category",
      error,
    });
  }
};

//delete
export const deletecategory = async (req,res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: " Category Deleted successfully!...",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error with Delete Category",
      error,
    });
  }
};
