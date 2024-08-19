const { raw } = require("body-parser");
const databases = require("../config/databases");

const createIcetStudent = async (req, res) => {
  try {
    const inputData = req.body;
    const mappedReference = inputData.reference.map((reference) => {
      return `${reference.friendName}: ${reference.friendPhoneNumber}`;
    });

    let isStudentAvailable = await databases.icet.findOne({
      where: {
        ICETHallTicketNo: inputData.qualifyingDetails[0].ICETHallTicketNo
      }
    });
    if (isStudentAvailable) {
      return res.status(400).json({
        success: false,
        message: `Your Hall Ticket ${inputData.qualifyingDetails[0].ICETHallTicketNo} is already exist`
      });
    }
    let data = await databases.students.create({
      nameOfApplicant: inputData.nameOfApplicant,
      fatherName: inputData.fatherName,
      dateOfBirth: inputData.dateOfBirth,
      addressOfCommunication: inputData.addressOfCommunication,
      phoneNumber: inputData.phoneNumber,
      phoneNumber1: inputData.phoneNumber1,
      aadharNo: inputData.aadharNo,
      category: inputData.category,
      date: inputData.date,
      requestType: inputData.requestType?.toUpperCase(),
      courseLevel: inputData.courseLevel,
      courseName: inputData.courseName,
      nameofInstution: inputData.nameofInstution,
      withReferenceOf: inputData.withReferenceOf,
      reference: mappedReference.join(", ") || null
    });
    if (data) {
      let student = await databases.icet.create({
        degreeClgName: inputData.qualifyingDetails[0].degreeClgName,
        university: inputData.qualifyingDetails[0].university,
        degreePassingYear: inputData.qualifyingDetails[0].degreePassingYear,
        degreeObtainedMarks: inputData.qualifyingDetails[0].degreeObtainedMarks,
        degreePercentage: inputData.qualifyingDetails[0].degreePercentage,
        ICETHallTicketNo: inputData.qualifyingDetails[0].ICETHallTicketNo,
        ICETRank: inputData.qualifyingDetails[0].ICETRank,
        _student: data.id
      });
      return res.status(200).json({
        success: true,
        data: student,
        message: "Data Submited successfully"
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

const removeIcetStudentById = async (req, res) => {
  try {
    let { id } = req.params;
    id = id.substring(5);
    let isStudentExist = await databases.students.findOne({
      where: { id: id }
    });
    if (!isStudentExist) {
      return res.status(404).json({
        success: false,
        message: `Student ID ${req.params} not exist..`
      });
    }
    let deleted = await databases.students.destroy({
      where: {
        id: id
      }
    });
    if (deleted.length > 1) {
      await databases.icet.destroy({
        where: { _student: id }
      });
      return res.status(200).json({
        success: true,
        message: "Student Deleted Successfully"
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

const createCollege = async (req, res) => {
  try {
    const input = req.body.data;

    for (let i = 0; i < input.length; i++) {
      await databases.icetClg.create({
        clgCode: input[i].clgCode,
        clgName: input[i].clgName,
        university: input[i].university
      });
    }
    return res.status(200).json({
      success: true,
      message: "clg inserted successfully"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getAllColleges = async (req, res) => {
  try {
    const colleges = await databases.icetClg.findAll({ raw: true });
    if (colleges.length <= 1) {
      return res.status(404).json({
        success: false,
        message: "College not found"
      });
    }
    return res.status(200).json({
      success: true,
      data: colleges
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getAllIcetWalkInsStudents = async (req, res) => {
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
      where: { requestType: "ICET" },
      limit: limit,
      offset: offset,
      raw: true
    });

    // Get the total count of records
    const count = await databases.students.count({
      where: { requestType: "ICET" }
    });

    // Enrich student data with qualifying details
    const enrichedStudentsData = await Promise.all(
      studentsData.map(async (student) => {
        let qualifyingDetails = await databases.icet.findOne({
          attributes: ["ICETRank", "ICETHallTicketNo"],
          where: { _student: student.id },
          raw: true
        });

        if (!qualifyingDetails) {
          qualifyingDetails = {
            ICETRank: "N/A",
            ICETHallTicketNo: "N/A"
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
  createIcetStudent,
  createCollege,
  getAllColleges,
  getAllIcetWalkInsStudents
};
