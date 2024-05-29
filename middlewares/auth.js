const jwt = require("jsonwebtoken");
const databases = require("../config/databases");

const auth = async (req, res, next) => {
  const bearerHeader =
    req.headers["Authorization"] || req.headers["authorization"];
  if (!bearerHeader) {
    return res.status(401).json({
      success: false,
      message: "Incomplete authentication information"
    });
  }
  const accessToken = bearerHeader.split(" ")[1];
  if (!accessToken) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token"
    });
  }
  try {
    const user = jwt.verify(accessToken, process.env.ACCESS_JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized"
    });
  }
};

module.exports = { auth };
