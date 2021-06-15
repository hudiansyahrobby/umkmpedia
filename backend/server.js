const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { DBInit } = require("./utils/DBInit");
const authRoute = require("./router/auth");
const productRoute = require("./router/product");
const cartRoute = require("./router/cart");
const wishlistRoute = require("./router/wishlist");
const categoryRoute = require("./router/category");
const unitRoute = require("./router/unit");
const orderRoute = require("./router/order");
const path = require("path");

dotenv.config();

const app = express();
DBInit();
console.log(process.env.FRONT_END_URL);
app.use(
  cors({
    origin: process.env.FRONT_END_URL,
    credentials: true,
  })
);

app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use("/api", authRoute);
app.use("/api", productRoute);
app.use("/api", cartRoute);
app.use("/api", wishlistRoute);
app.use("/api", categoryRoute);
app.use("/api", orderRoute);
app.use("/api", unitRoute);

app.listen(PORT, () => {
  console.log(`Listening to Port ${PORT}`);
});
