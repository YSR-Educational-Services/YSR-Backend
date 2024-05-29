const databases = require("../config/databases");
const {
  checkAndWriteHeaders,
  appendToSheet
} = require("../helpers/googleSheet");

const createStudentRegistration = async (req, res) => {
  try {
    let inputData = req.body;
    console.log();
    let studentData = await databases.students.create({
      nameOfApplicant: inputData.nameOfApplicant,
      fatherName: inputData.fatherName,
      dateOfBirth: inputData.dateOfBirth,
      addressOfCommunication: inputData.addressOfCommunication,
      phoneNumber: inputData.phoneNumber,
      aadharNo: inputData.aadharNo,
      category: inputData.category,
      qualifyingDetails: JSON.stringify(inputData.qualifyingDetails),
      nameofInstution: inputData.nameofInstution,
      courseName: inputData.courseName.map((course) => course).join(", "),
      paymentStructure: inputData.paymentStructure,
      withReferenceOf: inputData.withReferenceOf,
      referance: JSON.stringify(inputData.referance)
    });
    inputData.downloadLink = `http://localhost:3000/user/student-data-by-id/${studentData.id}`;
    inputData.id = studentData.id;
    const values = [
      [
        inputData.id,
        inputData.nameOfApplicant,
        inputData.fatherName,
        inputData.dateOfBirth,
        inputData.addressOfCommunication,
        inputData.phoneNumber,
        inputData.aadharNo,
        inputData.category,
        inputData.qualifyingDetails
          .map(
            (q) =>
              `Course-${q.course}, Board/University-${q.boardUniversity}, Year-${q.year}, Marks Obtained-${q.markObtained}, Percentage-${q.percentage}, Grade-${q.grade}, H.No-${q.HNo}, Rank-${q.rank}`
          )
          .join("; "),
        inputData.nameofInstution,
        inputData.courseName
          .map((c) => `Course ${c.course}- ${c.branch}`)
          .join("; "),

        //    JSON.stringify(inputData.courseName),
        inputData.paymentStructure,
        inputData.withReferenceOf,
        inputData.referance
          .map((r) => `Name-${r.name}, Phone Number- ${r.phoneNumber}`)
          .join("; "),
        (downloadLink = `http://localhost:3000/user/student-data-by-id/${inputData.id}`)
      ]
    ];
    try {
      const headerValues = [
        "Id",
        "Name Of Applicant",
        "Father Name",
        "Date Of Birth",
        "Address Of Communication",
        "Phone Number",
        "Aadhar No",
        "Category",
        "Qualifying Details",
        "Name Of Instution",
        "Course Name",
        "Payment Structure",
        "With Refrence of",
        "Referance",
        "Download_Link"
      ];
      await checkAndWriteHeaders(headerValues);
      console.log(1);
      const response = await appendToSheet(values);
      // res.status(200).send(response.data);
    } catch (error) {
      res.status(500).send("Error writing to sheet: " + error.message);
    }

    if (studentData) {
      return res.status(200).json({
        success: true,
        message: "Data Submited Successfully....",
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

const getStudentDetailsById = async (req, res) => {
  try {
    let { id } = req.params;
    let studentData = await databases.students.findOne({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: { id }
    });
    if (!studentData) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }
    return res.status(200).json({
      success: true,
      data: studentData
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getAllStudentsDetails = async (req, res) => {
  try {
    let studentsData = await databases.students.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] }
    });
    if (!studentsData) {
      return res.status(404).json({
        success: false,
        message: "No Record Found"
      });
    }
    return res.status(200).json({
      success: true,
      data: studentsData
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
  createStudentRegistration,
  getStudentDetailsById,
  getAllStudentsDetails,
  
};
