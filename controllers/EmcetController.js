const databases = require("../config/databases");

const craeteEmcetStudent = async (req, res) => {
  try {
    let inputData = req.body;
  
    const mappedReference = inputData.reference.map((reference) => {
      return `${reference.friendName}: ${reference.friendPhoneNumber}`;
    });
    let emcetStudentData = await databases.emcetStudent.create({
      nameOfApplicant: inputData.nameOfApplicant,
      fatherName: inputData.fatherName,
      dateOfBirth: inputData.dateOfBirth,
      addressOfCommunication: inputData.addressOfCommunication,
      phoneNumber: inputData.phoneNumber,
      aadharNo: inputData.aadharNo,
      category: inputData.category,
      sscSchoolName: inputData.qualifyingDetails[0].sscSchoolName,
      sscPassingYear: inputData.qualifyingDetails[0].sscPassingYear,
      sscPercentage: inputData.qualifyingDetails[0].sscPercentage,
      hscSchoolName: inputData.qualifyingDetails[0].hscSchoolName,
      hscPassingYear: inputData.qualifyingDetails[0].hscPassingYear,
      hscPercentage: inputData.qualifyingDetails[0].hscPercentage,
      EMCETHallTicketNo: inputData.qualifyingDetails[0].EMCETHallTicketNo,
      EMCETRank: inputData.qualifyingDetails[0].EMCETRank,
      courseName: inputData.courseName.map((course) => course).join(", "),
      nameofInstution: inputData.nameofInstution,
      withReferenceOf: inputData.withReferenceOf,
      reference: mappedReference.map((referance) => referance).join(",")
    });

    if (emcetStudentData) {
      res.status(200).json({
        success: true,
        data: emcetStudentData,
        message: "Registrations Done"
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getEmcetStudentById = async (req, res) => {
  try {
    let { id } = req.params;

    let studentData = await databases.emcetStudent.findOne({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: { id }
    });

    if (studentData) {
      return res.status(200).json({
        success: true,
        data: studentData
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getListOfEmcet = async (req, res) => {
  try {
    const { adminType } = req.user;
    let emcetRecords;
    if (adminType == "subAdmin") {
      emcetRecords = await databases.emcetStudent.findAll({
        attributes: { exclude: ["craetedAt", "updatedAt"] },
        order: [["createdAt", "DESC"]]
      });
      if (emcetRecords) {
        return res.status(200).json({
          success: true,
          data: emcetRecords
        });
      }
    }
    return res.status(402).json({
      success: false,
      message: "You Dont have access"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getEmcetStudent = async (req, res) => {
  try {
    const { EMCETHallTicketNo, phoneNumber, id } = req.body;
    let whereCondition = {};

    if (EMCETHallTicketNo) {
      whereCondition.EMCETHallTicketNo = EMCETHallTicketNo;
    } else if (phoneNumber) {
      whereCondition.phoneNumber = phoneNumber;
    } else if (id) {
      whereCondition.id = id;
    } else {
      return res.status(400).json({
        success: false,
        message:
          "Please provide valid search criteria (EMCETHallTicketNo, phoneNumber, or id)"
      });
    }

    const student = await databases.emcetStudent.findOne({
      where: whereCondition
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }
    return res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};
module.exports = {
  craeteEmcetStudent,
  getEmcetStudentById,
  getListOfEmcet,
  getEmcetStudent
};
