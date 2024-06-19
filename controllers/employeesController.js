const databases = require("../config/databases");

const addEmployees = async (req, res) => {
  try {
    const { phoneNumber, name } = req.body;
    let checkNumberExist = await databases.employees.findOne({
      where: { phoneNumber }
    });
    if (checkNumberExist) {
      return res.status(402).json({
        success: false,
        message: "Phone Number already Exits........"
      });
    }
    let employeesData = await databases.employees.create({
      name,
      phoneNumber
    });

    if (employeesData) {
      return res.status(200).json({
        success: true,
        message: "Employee added Successfully......"
      });
    }
    return res.status(400).json({
      success: false,
      message: "Failure......"
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message: error.message
    });
  }
};

const removeEmployees = async (req, res) => {
  try {
    let { id } = req.params;
    id = id.substring(8);
    let checkEmpExist = await databases.employees.findOne({
      where: { id }
    });

    if (!checkEmpExist) {
      return res.status(402).json({
        success: false,
        message: "Record Not Found"
      });
    }
    let destroyed = await databases.employees.destroy({
      where: { id }
    });
    if (destroyed > 0) {
      return res.status(200).json({
        success: true,
        message: "Employee Deleted Successfully......"
      });
    }
    return res.status(400).json({
      success: false,
      message: "Failure......"
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message: error.message
    });
  }
};

const updateEmployeeDetails = async (req, res) => {
  try {
    let { id, name, phoneNumber } = req.body;
    id = id.substring(8);

    const checkEmpExist = await databases.employees.findOne({ where: { id } });
    if (!checkEmpExist) {
      return res.status(400).json({
        success: false,
        message: "Employee Record Not Found......"
      });
    }
    const updated = await databases.employees.update(
      { name, phoneNumber },
      { where: { id } }
    );
    if (updated > 0) {
      return res.status(200).json({
        success: true,
        message: "Employee Details Updated Successfully......"
      });
    }
    return res.status(400).json({
      success: false,
      message: "Failed to update"
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message: error.message
    });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    let employeesData = await databases.employees.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      order: [["createdAt", "DESC"]],
      raw: true
    });
    if (employeesData.length > 0) {
      for (let i = 0; i < employeesData.length; i++) {
        employeesData[i].id = "YSREMP24" + employeesData[i].id;
      }
      return res.status(200).json({
        success: true,
        data: employeesData
      });
    }
    return res.status(404).json({
      success: false,
      message: `Record Not Found....`,
      data: null
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  addEmployees,
  getAllEmployees,
  removeEmployees,
  updateEmployeeDetails
};
