"use strict";
const express = require("express");
const cors = require("cors");
const dotevn = require("dotenv");
const multer = require("multer");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
dotevn.config();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

mongoose
  .connect(process.env.MONGO_STRING)
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));
const port = 3001;
const Product = require("./routes/ProductRoutes");
const User = require("./routes/UserRoutes");
const Cart = require("./routes/CartRoutes");
const Order = require("./routes/OrderRoutes");
app.use("/api/v1/product", Product);
app.use("/api/v1/user", User);
app.use("/api/v1/cart", Cart);
app.use("/api/v1/order", Order);
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

app.listen(port, () => console.log(`Running on port: ${port}`));
