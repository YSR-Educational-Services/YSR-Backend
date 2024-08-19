const bcrypt = require("bcrypt");
const { validatePassword } = require("../helpers/passwordValidate");
const createTokens = require("../helpers/jwt.helper");
const databases = require("../config/databases");

const createAdmin = async (req, res) => {
  try {
    const { email, password, name, adminType } = req.body;
    if (!validatePassword(password)) {
      return res.status(401).json({
        success: false,
        message: `Password must contain at least one capital letter, one small letter, one special character, one number, and be at least 8 characters long.`
      });
    }
    const hash = bcrypt.hashSync(password, 10);
    let adminData = await databases.admin.create({
      name,
      email: email,
      password: hash,
      adminType
    });

    if (adminData) {
      return res.status(200).json({
        success: true,
        message: "Account Created Successfully......",
        Data: adminData
      });
    }
    return res.status(400).json({
      success: false,
      message: "Failed to create admin",
      Data: adminData
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message: error.message
    });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    let userData = await databases.admin.findOne({
      where: { email }
    });
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found please enter Valid Email"
      });
    }
    const hashPassword = userData.password;

    const result = bcrypt.compareSync(password, hashPassword);
    if (result) {
      const payload = {
        id: userData.id,
        email: userData.email,
        adminType: userData.adminType
      };
      const token = await createTokens(payload, databases);

      return res.status(200).json({
        success: true,
        token
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Invalid password/credentials"
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message: error.message
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!validatePassword(password)) {
      return res.status(401).json({
        success: false,
        message: `Password must contain at least one capital letter, one small letter, one special character, one number, and be at least 8 characters long.`
      });
    }
    let hashPassword = bcrypt.hashSync(password, 10);
    let result = await databases.admin.update(
      { password: hashPassword },
      { where: { email: email } }
    );

    if (result.length >= 1) {
      return res.status(200).json({
        success: true,
        message: "Password Change Successfully"
      });
    }
    return res.status(400).json({
      success: false,
      message: "Failed to change password"
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { createAdmin, adminLogin, changePassword };
