require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const api = require("./routes/api");
const app = express();
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

var corsOptions = {
  origin: function (origin, callback) {
    if (process.env.NODE_ENV == "development") {
      callback(null, true);
    } else {
      if (process.env.WHITE_LIST?.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Unauthorized Domain"));
      }
    }
  }
};
app.use(cors(corsOptions));
app.use((err, req, res, next) => {
  if (err) {
    return res.status(403).json({ error: err.message });
  }
  next();
});
app.use((req, res, next) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers":
      "Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token"
  });

  next();
});

const init = async () => {
  app.use("/api/v1/user", api);
  app.use("/api/v1/admin", api);

  let port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log(`Sever Running at port Number ${port}`);
  });
};
init();
