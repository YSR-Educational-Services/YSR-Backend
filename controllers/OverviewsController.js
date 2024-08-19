const { where } = require("sequelize");
const databases = require("../config/databases");
const {
  checkAndWriteHeaders,
  appendToSheet
} = require("../helpers/googleSheet");

//this is just for temp use
const getAllDocSubmittedStudentsId = async (req, res) => {
  try {
    let docTable = await databases.eapcetDecuments.findAll({
      attributes: ["_student"],
      order: [["_student", "DESC"]],
      raw: true
    });
    let studentTable = await databases.students.findAll({
      attributes: ["id"],
      where: { isDocumentsSubmitted: true }
    });
    if (studentTable) {
      let studentTableLength = studentTable.length;
      let docTableLength = docTable.length;

      return res.status(200).json({
        success: false,
        data: {
          studentTable: studentTable,
          docTable: docTable,
          studentTableLength,
          docTableLength
        }
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

const getTotalCountOfSubmittedDoc = async (req, res) => {
  try {
    let totalCount = await databases.students.count({
      where: { isDocumentsSubmitted: true }
    });
    if (totalCount) {
      return res.status(200).json({
        success: false,
        data: totalCount
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

const getAllDocSubmittedStudentsData = async (req, res) => {
  try {
    let { page, limit } = req.query;
    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 10;
    // page = page ? parseInt(page) : 1;
    // limit = 10;
    if (page < 1 || limit < 1) {
      return res.status(400).json({
        success: false,
        message: "Page and limit must be positive integers"
      });
    }
    const offset = (page - 1) * limit;
    let studentsData = await databases.students.findAll({
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
      where: { isDocumentsSubmitted: true },
      limit: limit,
      offset: offset,
      raw: true
    });
    let totalStudents = await databases.students.count({
      where: { isDocumentsSubmitted: true }
    });
    if (studentsData) {
      const studentPromises = studentsData.map(async (student) => {
        const [qualifyingDetails, studentsOriginalDoc] = await Promise.all([
          databases.eapcet.findOne({
            attributes: ["EAPCETRank", "EAPCETHallTicketNo"],
            where: { _student: student.id },
            raw: true
          }),
          databases.eapcetDecuments.findOne({
            where: { _student: student.id },
            raw: true
          })
        ]);

        let finalQualifyingDetails = qualifyingDetails || {
          EAPCETRank: "N/A",
          EAPCETHallTicketNo: "N/A"
        };

        if (!finalQualifyingDetails.EAPCETRank) {
          finalQualifyingDetails.EAPCETRank = "N/A";
        }
        if (!finalQualifyingDetails.EAPCETHallTicketNo) {
          finalQualifyingDetails.EAPCETHallTicketNo = "N/A";
        }

        let filteredDoc = {};
        if (studentsOriginalDoc) {
          for (const key in studentsOriginalDoc) {
            if (studentsOriginalDoc[key] === "ORIGINAL") {
              let newKey = key;
              if (newKey === "HSCBonafideCertificate") {
                newKey = "INTER-BONAFIDE";
              } else if (newKey === "castCertificate") {
                newKey = "CASTECERTIFICATE";
              } else if (newKey === "SSCBonafideCertificate") {
                newKey = "SSC-BONAFIDE";
              }
              filteredDoc[newKey.toUpperCase()] = studentsOriginalDoc[key];
            }
          }
        }

        student.id = "YSR24" + student.id;
        student.studentsOriginalDoc = filteredDoc;
        student.qualifyingDetails = finalQualifyingDetails;
        student.docSubmittedDate = studentsOriginalDoc?.date;

        return student;
      });

      studentsData = await Promise.all(studentPromises);

      return res.status(200).json({
        success: true,
        data: { studentsData, totalStudents }
      });
    }

    return res.status(404).json({
      success: false,
      message: "no record found"
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
    let temp = await databases.eapcetDecuments.findAll({ raw: true });
    let studentsData = [];

    const studentPromises = temp.map(async (student) => {
      const tempStudent = await databases.students.findOne({
        where: { id: student._student },
        raw: true
      });
      studentsData.push(tempStudent);
    });

    await Promise.all(studentPromises);

    if (studentsData.length > 0) {
      for (let i = 0; i < studentsData.length; i++) {
        let studentsOriginalDoc = await databases.eapcetDecuments.findOne({
          where: { _student: studentsData[i].id },
          raw: true
        });

        let qualifyingDetails = await databases.eapcet.findOne({
          where: { _student: studentsData[i].id },
          raw: true
        });

        let filteredDoc = {};
        if (studentsOriginalDoc) {
          for (const key in studentsOriginalDoc) {
            if (studentsOriginalDoc[key] === "ORIGINAL") {
              let newKey = key;
              if (newKey === "HSCBonafideCertificate") {
                newKey = "INTER-BONAFIDE";
              } else if (newKey === "castCertificate") {
                newKey = "CASTECERTIFICATE";
              } else if (newKey === "SSCBonafideCertificate") {
                newKey = "SSC-BONAFIDE";
              }
              filteredDoc[newKey.toUpperCase()] = studentsOriginalDoc[key];
            }
          }
        }
        studentsData[i].id = "YSR24" + studentsData[i].id;
        studentsData[i].studentsOriginalDoc = filteredDoc;
        studentsData[i].docsDate = studentsOriginalDoc.date;
        studentsData[i].HallTicketNumber = qualifyingDetails.EAPCETHallTicketNo;
        studentsData[i].EapcetRank = qualifyingDetails.EAPCETRank;
      }
      var spreadsheetId = "1wchsToFbIfnar4M99bYS41ITJwNbVeIn5_Bfkkmxy-M";
      const values = studentsData.map((student) => [
        student.id,
        student.date,
        student.nameOfApplicant,
        student.fatherName,
        student.dateOfBirth,
        student.phoneNumber,
        student.phoneNumber1,
        student.category,
        student.HallTicketNumber,
        student.EapcetRank,
        student.withReferenceOf,
        student.docsDate,
        JSON.stringify(student.studentsOriginalDoc)
      ]);

      const headerValues = [
        "Student Id",
        "Date Of Walk-In",
        "Name Of Applicant",
        "Father Name",
        "Date Of Birth",
        "Phone Number",
        "Alternate Number",
        "Category",
        "Hall Ticket Number",
        "Eapcet Rank",
        "With Reference of",
        "Date Of Docs Collected",
        "Submitted Documents"
      ];

      // Write to Google Sheet
      await checkAndWriteHeaders(headerValues, spreadsheetId);

      await appendToSheet(values, spreadsheetId);
      return res.status(200).json({
        success: true,
        message: "Data Added in Google sheets"
      });
    } else {
      res
        .status(404)
        .json({ message: "No students found with submitted documents." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error processing students details: " + error.message
    });
  }
};

const getAllWalkInsStudents = async (req, res) => {
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
      where: { requestType: "EAPCET" },
      limit: limit,
      offset: offset,
      raw: true
    });

    // Get the total count of records
    const count = await databases.students.count({
      where: { requestType: "EAPCET" }
    });

    // Enrich student data with qualifying details
    const enrichedStudentsData = await Promise.all(
      studentsData.map(async (student) => {
        let qualifyingDetails = await databases.eapcet.findOne({
          attributes: ["EAPCETRank", "EAPCETHallTicketNo"],
          where: { _student: student.id },
          raw: true
        });

        if (!qualifyingDetails) {
          qualifyingDetails = {
            EAPCETRank: "N/A",
            EAPCETHallTicketNo: "N/A"
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
    console.error("Error fetching students:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

const getLoginPendingStudents = async (req, res) => {
  try {
    let { page, limit } = req.query;
    page = page ? parseInt(page) : 1;
    limit = limit ? parseInt(limit) : 10;
    const offset = (page - 1) * limit;
    let studentsData = await databases.students.findAll({
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
      where: { isLoggedin: false },
      limit: limit,
      offset: offset,
      raw: true
    });
    const totalStudents = await databases.students.count({
      where: { isLoggedin: false }
    });
    if (studentsData) {
      for (let i = 0; i < studentsData.length; i++) {
        let qualifyingDetails = await databases.eapcet.findOne({
          attributes: ["EAPCETRank", "EAPCETHallTicketNo"],
          where: { _student: studentsData[i].id },
          raw: true
        });
        if (!qualifyingDetails) {
          qualifyingDetails = {
            EAPCETRank: "N/A",
            EAPCETHallTicketNo: "N/A"
          };
        }
        if (!qualifyingDetails.EAPCETRank) {
          qualifyingDetails.EAPCETRank = "N/A";
        }
        if (!qualifyingDetails.EAPCETHallTicketNo) {
          qualifyingDetails.EAPCETHallTicketNo = "N/A";
        }
        studentsData[i].id = "YSR24" + studentsData[i].id;
        studentsData[i].qualifyingDetails = qualifyingDetails;
      }
      return res.status(200).json({
        success: true,
        data: { studentsData, totalStudents }
      });
    }
    return res.status(404).json({
      success: false,
      message: `no record found`
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getLoggedinStudents = async (req, res) => {
  try {
    let { page } = req.params;
    page = page ? parseInt(page) : 1;
    let limit = 10;
    const offset = (page - 1) * limit;
    let studentsData = await databases.students.findAll({
      attributes: [
        "id",
        "date",
        "nameOfApplicant",
        "fatherName",
        "category",
        "dateOfBirth",
        "phoneNumber",
        "phoneNumber1",
        "withReferenceOf",
        "requestType"
      ],
      order: [["createdAt", "DESC"]],
      where: { isLoggedin: true },
      limit: limit,
      offset: offset,
      raw: true
    });
    let totalStudents = await databases.students.count({
      where: { isLoggedin: true }
    });
    if (studentsData) {
      for (let i = 0; i < studentsData.length; i++) {
        let loginDetails = await databases.loginDetails.findOne({
          where: { _student: studentsData[i].id }
        });
        let qualifyingDetails = await databases.eapcet.findOne({
          attributes: ["EAPCETRank", "EAPCETHallTicketNo"],
          where: { _student: studentsData[i].id },
          raw: true
        });
        if (!qualifyingDetails) {
          qualifyingDetails = {
            EAPCETRank: "N/A",
            EAPCETHallTicketNo: "N/A"
          };
        }
        if (!qualifyingDetails.EAPCETRank) {
          qualifyingDetails.EAPCETRank = "N/A";
        }
        if (!qualifyingDetails.EAPCETHallTicketNo) {
          qualifyingDetails.EAPCETHallTicketNo = "N/A";
        }
        studentsData[i].loginDetails = loginDetails;
        studentsData[i].id = "YSR24" + studentsData[i].id;
        studentsData[i].qualifyingDetails = qualifyingDetails;
      }
      return res.status(200).json({
        success: true,
        data: { studentsData, totalStudents }
      });
    }
    return res.status(404).json({
      success: false,
      message: `no record found`
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getOverviewsCount = async (req, res) => {
  try {
    const { examType } = req.params;

    let totalWalkIns;
    if (examType?.toUpperCase() != "DASHBOARD") {
      totalWalkIns = await databases.students.count({
        where: { requestType: examType }
      });
    } else {
      totalWalkIns = await databases.students.count();
    }
    let totalCollectedDocs;
    let totalLoggedIn;
    let totalPendingLogIn;
    if (examType?.toUpperCase() === "EAPCET") {
      totalCollectedDocs = await databases.eapcetDecuments.count();
      totalLoggedIn = await databases.students.count({
        where: { isLoggedin: true, requestType: examType }
      });
      totalPendingLogIn = await databases.students.count({
        where: { isLoggedin: false, requestType: examType }
      });
    } else if (examType?.toUpperCase() === "ECET") {
      totalCollectedDocs = await databases.eapcetDecuments.count();
      totalLoggedIn = await databases.students.count({
        where: { isLoggedin: true, requestType: examType }
      });
      totalPendingLogIn = await databases.students.count({
        where: { isLoggedin: false, requestType: examType }
      });
    } else if (examType === "ICET") {
      totalCollectedDocs = await databases.icetDocuments.count();
      totalLoggedIn = await databases.students.count({
        where: { isLoggedin: true, requestType: examType }
      });
      totalPendingLogIn = await databases.students.count({
        where: { isLoggedin: false, requestType: examType }
      });
    } else {
      totalCollectedDocs = await databases.eapcetDecuments.count();
      totalLoggedIn = await databases.students.count({
        where: { isLoggedin: true }
      });
      totalPendingLogIn = await databases.students.count({
        where: { isLoggedin: false }
      });
    }
    return res.status(200).json({
      success: true,
      data: {
        totalWalkIns: totalWalkIns || 0,
        totalCollectedDocs: totalCollectedDocs || 0,
        totalLoggedIn: totalLoggedIn || 0,
        totalPendingLogIn: totalPendingLogIn || 0
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
  getAllDocSubmittedStudentsId,
  getAllDocSubmittedStudentsData,
  getLoginPendingStudents,
  getLoggedinStudents,
  getAllStudentsDetails,
  getTotalCountOfSubmittedDoc,
  getAllWalkInsStudents,
  getOverviewsCount
};
