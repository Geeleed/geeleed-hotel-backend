require("dotenv").config();
const express = require("express");

const mongoose = require("mongoose");
mongoose
  .connect(process.env.CONNECTION_STRING + process.env.DATABASE_NAME)
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.error(err));

const app = express();

const generalRouter = require("./routers/general");
const stripeRouter = require("./routers/stripe");
const authRouter = require("./routers/auth");

const imageRouter = require("./routers/Image/image");
const memberRouter = require("./routers/Member/member");
const orderRouter = require("./routers/Order/order");
const roomRouter = require("./routers/Room/room");

// app.use("/", generalRouter);
// app.use("/", stripeRouter);
// app.use("/", imageRouter);
// app.use("/", memberRouter);
// app.use("/", orderRouter);
// app.use("/", roomRouter);
// app.use("/", authRouter);
app.use(
  generalRouter,
  stripeRouter,
  imageRouter,
  memberRouter,
  orderRouter,
  roomRouter,
  authRouter
);

app.use(require("./config/cors"));

const { PORT, SERVER_IP } = process.env;
app.listen(PORT, SERVER_IP, () => {
  console.log(`Server is running on http://${SERVER_IP}:${PORT}`);
});
