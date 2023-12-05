const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");
const cors = require("cors");
const con = require("./utils/db");
const app = express();

// config
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors("*"));
app.use(helmet());
dotenv.config();

// routes imports
const userRoute = require("./routes/usersRoute");
const productRoute = require("./routes/productsRoute");
const cartroute = require("./routes/cartRoute");

// main
con();

app.use("/api/v1/users", userRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/carts", cartroute);

// ports
port = process.env.PORT || 20;
app.listen(port, () => console.log("listening on port", port));
