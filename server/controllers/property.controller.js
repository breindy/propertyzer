import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";

import Property from "../mongodb/models/property.js";
import User from "../mongodb/models/user.js";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllProperties = async (req, res) => {
  const {
    _end,
    _order,
    _start,
    _sort,
    title_like = "",
    propertyType = "",
  } = req.query;

  const query = {};

  if (propertyType !== "") {
    query.propertyType = propertyType;
  }

  if (title_like !== "") {
    query.title = { $regex: title_like, $options: "i" };
  }

  try {
    const propertyCount = await Property.countDocuments({ query });
    const properties = await Property.find(query)
      .limit(_end)
      .sort({ [_sort]: _order });

    // pagination by sending it through the headers
    res.header("x-total-count", propertyCount);
    res.header("Acess-Control-Expose-Headers", "x-total-count");

    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPropertyDetails = async (req, res) => {};

const createProperty = async (req, res) => {
  try {
    const { title, description, propertyType, location, price, photo, email } =
      req.body;

    // Start new session - an atomic transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    const user = await User.findOne({ email }).session(session);

    if (!user) {
      throw new Error("User not found.");
    }

    const photoURL = await cloudinary.uploader.upload(photo);

    const newProperty = await Property.create({
      title,
      description,
      propertyType,
      location,
      price,
      photo: photoURL.url,
      creator: user._id,
    });

    user.allProperties.push(newProperty._id);
    await user.save({ session });

    await session.commitTransaction();

    res.status(200).json({ message: "Property created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProperty = async (req, res) => {};

const deleteProperty = async (req, res) => {};

export {
  getAllProperties,
  getPropertyDetails,
  createProperty,
  updateProperty,
  deleteProperty,
};
