const { raw } = require("body-parser");
const databases = require("../config/databases");
const { Op, where } = require("sequelize");

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

const topPerformance = async (req, res) => {
  try {
    let allEmployees = await databases.employees.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      raw: true
    });

    if (allEmployees.length > 0) {
      for (let i = 0; i < allEmployees.length; i++) {
        let topPerformanceCount = await databases.students.count({
          where: {
            withReferenceOf: {
              [Op.like]: `%(${allEmployees[i].phoneNumber})%`
            }
          }
        });
        let avg = (topPerformanceCount / 30) * 100;
        allEmployees[i].count = avg.toFixed(2);
      }

      allEmployees.sort((a, b) => b.count - a.count);
    }

    return res.status(200).json({
      success: true,
      data: allEmployees
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message: error.message
    });
  }
};

const performanceGraph = async (req, res) => {
  try {
    const currentDate = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(currentDate.getDate() - 7);
    let allEmployees = await databases.employees.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      raw: true
    });
    let topPerformanceCounts = [];
    if (allEmployees.length > 0) {
      for (let i = 0; i < allEmployees.length; i++) {
        const topPerformance = await databases.students.count({
          where: {
            withReferenceOf: {
              [Op.like]: `%(${allEmployees[i].phoneNumber})%`
            },
            createdAt: {
              [Op.between]: [sevenDaysAgo, currentDate]
            }
          }
        });

        allEmployees[i].count = topPerformance;
      }
    }

    return res.status(200).json({
      success: true,
      data: allEmployees
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message: error.message
    });
  }
};

const totalPerformanceDaywise = async (req, res) => {
  try {
    let { startDate, endDate } = req.query;

    // Set default dates if not provided
    if (startDate) {
      startDate = new Date(startDate);
    } else {
      startDate = new Date();
    }

    if (endDate) {
      endDate = new Date(endDate);
    } else {
      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() - 6);
    }

    // Ensure startDate is after endDate
    if (startDate < endDate) {
      [startDate, endDate] = [endDate, startDate];
    }

    let reality = [];
    let date = new Date(endDate);
    let sumOfReality = 0;
    while (date <= startDate) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      const totalReality = await databases.students.count({
        where: {
          createdAt: {
            [Op.between]: [startOfDay, endOfDay]
          }
        }
      });
      sumOfReality += totalReality;
      reality.push({
        date: date.toISOString().split("T")[0],
        count: totalReality
      });
      date.setDate(date.getDate() + 1);
    }

    return res.status(200).json({
      success: true,
      data: reality
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
  updateEmployeeDetails,
  topPerformance,
  totalPerformanceDaywise
};
