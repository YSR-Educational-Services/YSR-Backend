require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const api = require("./routes/api");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

// Parse and log whitelist domains
let whitelist;
try {
  whitelist = JSON.parse(process.env.WHITELIST_DOMAINS);
  console.log("Whitelist domains:", whitelist);
} catch (error) {
  console.error("Error parsing WHITELIST_DOMAINS:", error);
  process.exit(1);
}

// CORS configuration with detailed logging
var corsOptions = {
  origin: function (origin, callback) {
    console.log("Incoming request from origin:", origin);
    if (!origin) {
      return callback(null, true);
    }
    if (process.env.NODE_ENV === "development") {
      callback(null, true);
    } else {
      if (whitelist?.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Unauthorized Domain"));
      }
    }
  }
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Enable preflight requests for all routes

app.use((err, req, res, next) => {
  if (err) {
    return res.status(403).json({ error: err.message });
  }
  next();
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

const init = async () => {
  app.use("/api/v1/user", api);
  app.use("/api/v1/admin", api);

  let port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log(`Server running at port number ${port}`);
  });
};

init();
