const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  images: { type: String, required: true },
  description: { type: String },
  createAt: { type: Date },
  updateAt: { type: Date },
});

const Image = (collectionName = "Image") =>
  mongoose.model(collectionName, ImageSchema);

module.exports = Image;
