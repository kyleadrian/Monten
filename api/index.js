// Require Dependencies
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

// Set up Database
mongoose.connect(
  "mongodb://kyleadrian91:Eklip5e12!@ds137596.mlab.com:37596/monten",
  { useNewUrlParser: true }
);

// Server Configuration
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());

// Routes
app.use(require("./routes/authRoutes"));

// Server Setup
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Port listening on ${port}`);
});
