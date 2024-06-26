const databases = require("../config/databases");
const {
  checkAndWriteHeaders,
  appendToSheet
} = require("../helpers/googleSheet");

const getAllDocSubmittedStudentsId = async (req, res) => {
  try {
    let docSubmittedStudentIds = await databases.eapcetDecuments.findAll({
      attributes: ["_student"],
      order: [["createdAt", "DESC"]],
      raw: true
    });
    if (docSubmittedStudentIds) {
      return res.status(200).json({
        success: false,
        data: docSubmittedStudentIds
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

const getTodtalCountOfSubmittedDoc = async (req, res) => {
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
    let studentsData = await databases.students.findAll({
      attributes: [
        "id",
        "date",
        "nameOfApplicant",
        "fatherName",
        "category",
        "phoneNumber",
        "withReferenceOf",
        "requestType"
      ],
      order: [["createdAt", "DESC"]],
      where: { isDocumentsSubmitted: true },
      raw: true
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
        let studentsOriginalDoc = await databases.eapcetDecuments.findOne({
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
        studentsData[i].qualifyingDetails = qualifyingDetails;
      }
      return res.status(200).json({
        success: true,
        data: studentsData
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

const getAllStudentsDetails = async (req, res) => {
  try {
    let studentsData = await databases.students.findAll({
      where: { isDocumentsSubmitted: true },
      raw: true
    });

    if (studentsData) {
      for (let i = 0; i < studentsData.length; i++) {
        let studentsOriginalDoc = await databases.eapcetDecuments.findOne({
          where: { _student: studentsData[i].id },
          raw: true
        });

        let filteredDoc = {};
        if (studentsOriginalDoc) {
          for (const key in studentsOriginalDoc) {
            if (studentsOriginalDoc[key] === "ORIGINAL") {
              filteredDoc[key.toUpperCase()] = studentsOriginalDoc[key];
            }
          }
        }

        studentsData[i].studentsOriginalDoc = filteredDoc;

        studentsData[i].HallTicketNumber =
          studentsData[i].qualifyingDetails?.EAPCETHallTicketNo || "";
        studentsData[i].EapcetRank =
          studentsData[i].qualifyingDetails?.EAPCETRank || "";
      }

      const values = studentsData.map((student) => [
        student.id,
        student.nameOfApplicant,
        student.fatherName,
        student.dateOfBirth,
        student.phoneNumber,
        student.category,
        student.HallTicketNumber,
        student.EapcetRank,
        student.withReferenceOf,
        JSON.stringify(student.studentsOriginalDoc) // Convert object to string if needed
      ]);

      const headerValues = [
        "Student Id",
        "Name Of Applicant",
        "Father Name",
        "Date Of Birth",
        "Phone Number",
        "Category",
        "Hall Ticket Number",
        "Eapcet Rank",
        "With Reference of",
        "Submitted Documents"
      ];

      // Send JSON response with studentsData
      // res.json(studentsData.studentsOriginalDoc);

      // Write to Google Sheet
      const response1 = await checkAndWriteHeaders(headerValues);
      const response2 = await appendToSheet(values);
      return res.status(400).json({
        response1,
        response2
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
    let studentsData = await databases.students.findAll({
      attributes: [
        "id",
        "date",
        "nameOfApplicant",
        "fatherName",
        "category",
        "phoneNumber",
        "withReferenceOf",
        "requestType"
      ],
      order: [["createdAt", "DESC"]],
      raw: true
    });
    studentsData.totalWalkIns = await databases;
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
        data: studentsData
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

const getWalkInStudents = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error processing students details: " + error.message
    });
  }
};
module.exports = {
  getAllDocSubmittedStudentsId,
  getAllDocSubmittedStudentsData,
  getAllStudentsDetails,
  getTodtalCountOfSubmittedDoc,
  getAllWalkInsStudents
};
