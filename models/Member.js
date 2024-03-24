const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  role: { type: [String], default: ["user"] },
  createAt: { type: Date },
  updateAt: { type: Date },
});

const Member = (collectionName = "Member") =>
  mongoose.model(collectionName, MemberSchema);

module.exports = Member;
