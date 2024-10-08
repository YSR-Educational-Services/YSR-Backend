const databases = require("../config/databases");

const craeteEcetStudent = async (req, res) => {
  try {
    let inputData = req.body;

    const mappedReference = inputData.reference.map((reference) => {
      return `${reference.friendName}: ${reference.friendPhoneNumber}`;
    });
    let studentData = await databases.ecetStudent.create({
      nameOfApplicant: inputData.nameOfApplicant,
      fatherName: inputData.fatherName,
      dateOfBirth: inputData.dateOfBirth,
      addressOfCommunication: inputData.addressOfCommunication,
      phoneNumber: inputData.phoneNumber,
      aadharNo: inputData.aadharNo,
      category: inputData.category,
      polytechnicClgName: inputData.qualifyingDetails[0].polytechnicClgName,
      polytechnicPassingYear:
        inputData.qualifyingDetails[0].polytechnicPassingYear,
      polytechnicPercentage:
        inputData.qualifyingDetails[0].polytechnicPercentage,
      ECETHallTicketNo: inputData.qualifyingDetails[0].ECETHallTicketNo,
      ECETRank: inputData.qualifyingDetails[0].ECETRank,
      nameofInstution: inputData.nameofInstution,
      courseName: inputData.courseLevels.map((course) => course).join(", "),
      withReferenceOf: inputData.withReferenceOf,
      reference: mappedReference.map((referance) => referance).join(",")
    });

    if (studentData) {
      return res.status(200).json({
        success: true,
        data: studentData
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getEcetStudentById = async (req, res) => {
  try {
    let { id } = req.params;

    let studentData = await databases.ecetStudent.findOne({
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

const getListOfEcet = async (req, res) => {
  try {
    const { adminType } = req.user;
    let ecetRecords;
    if (adminType == "subAdmin") {
      ecetRecords = await databases.ecetStudent.findAll({
        attributes: { exclude: ["craetedAt", "updatedAt"] },
        order: [["createdAt", "DESC"]]
      });
      if (ecetRecords) {
        return res.status(200).json({
          success: true,
          data: ecetRecords
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

const getEcetStudent = async (req, res) => {
  try {
    const { ECETHallTicketNo, phoneNumber, id } = req.body;
    let whereCondition = {};

    if (ECETHallTicketNo) {
      whereCondition.ECETHallTicketNo = ECETHallTicketNo;
    } else if (phoneNumber) {
      whereCondition.phoneNumber = phoneNumber;
    } else if (id) {
      whereCondition.id = id;
    } else {
      return res.status(400).json({
        success: false,
        message:
          "Please provide valid search criteria (ECETHallTicketNo, phoneNumber, or id)"
      });
    }

    const student = await databases.ecetStudent.findOne({
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
const getAllEcetWalkInsStudents = async (req, res) => {
  try {
    let { page, limit } = req.query;
    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 10;
    if (page < 1 || limit < 1) {
      return res.status(400).json({
        success: false,
        message: "Page and limit must be positive integers"
      });
    }
    const offset = (page - 1) * limit;
    const studentsData = await databases.students.findAll({
      attributes: [
        "id",
        "date",
        "nameOfApplicant",
        "fatherName",
        "category",
        "phoneNumber",
        "phoneNumber1",
        "withReferenceOf",
        "requestType"
      ],
      order: [["createdAt", "DESC"]],
      where: { requestType: "ECET" },
      limit: limit,
      offset: offset,
      raw: true
    });
    // Get the total count of records
    const count = await databases.students.count({
      where: { requestType: "ECET" }
    });
    // Enrich student data with qualifying details
    const enrichedStudentsData = await Promise.all(
      studentsData.map(async (student) => {
        let qualifyingDetails = await databases.icet.findOne({
          attributes: ["ECETRank", "ECETHallTicketNo"],
          where: { _student: student.id },
          raw: true
        });

        if (!qualifyingDetails) {
          qualifyingDetails = {
            ECETRank: "N/A",
            ECETHallTicketNo: "N/A"
          };
        }
        return {
          ...student,
          id: "YSR24" + student.id,
          qualifyingDetails
        };
      })
    );
    return res.status(200).json({
      success: true,
      data: {
        studentsData: enrichedStudentsData,
        totalRecords: count
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
module.exports = {
  craeteEcetStudent,
  getEcetStudent,
  getListOfEcet,
  getEcetStudentById,
  getAllEcetWalkInsStudents
};
