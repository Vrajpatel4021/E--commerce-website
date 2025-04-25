const express = require("express");
const app = express();
const ErrorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const path=require('path')


app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use("/",express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
const allowedOrigins = [
  'http://localhost:5173',
  'https://ecommerce-vrajpatel-s73.netlify.app'
];
const cors = require('cors')
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
      path: "backend/config/.env",
    });
};
// Serve static files for uploads and products
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/products', express.static(path.join(__dirname, 'products')));
//import Routes
const user = require("./controller/user");
const product = require('./controller/product');
const orders = require('./controller/order');



app.use("/api/v2/user", user);
app.use("/api/v2/product", product);
app.use("/api/v2/orders", orders);

// it's for ErrorHandling
app.use(ErrorHandler);




// Serve frontend
app.use(express.static(path.join(__dirname, "../client/build"))); // Adjust path if client is outside backend

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});




module.exports = app;