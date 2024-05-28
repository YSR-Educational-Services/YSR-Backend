const databases = require("../config/databases");
const bcrypt = require("bcrypt");
const { validatePassword } = require("../helpers/passwordValidate");
const createTokens = require("../helpers/jwt.helper");

const createAdmin = async (req, res) => {
  try {
    const { email, password, name, adminType } = req.body;
    let checkIsemailAvailable = await databases.admin.findOne({
      where: { email }
    });
    if (checkIsemailAvailable) {
      return res.status(402).json({
        success: false,
        message: `This email ${email} is available already......`
      });
    }
    if (!validatePassword(password)) {
      return res.status(401).json({
        success: false,
        message: `Password must contain at least one capital letter, one small letter, one special character, one number, and be at least 8 characters long.`
      });
    }

    const hash = bcrypt.hashSync(password, 10);
    let adminData = await databases.admin.create({
      name,
      email,
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
    console.log(123);
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
        data: { userData, token }
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

module.exports = { createAdmin, adminLogin };
