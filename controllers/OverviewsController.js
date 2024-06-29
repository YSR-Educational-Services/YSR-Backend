const databases = require("../config/databases");
const {
  checkAndWriteHeaders,
  appendToSheet
} = require("../helpers/googleSheet");

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

// const getAllDocSubmittedStudentsData = async (req, res) => {
//   try {
//     console.log(123);
//     let studentsData = await databases.students.findAll({
//       attributes: [
//         "id",
//         "date",
//         "nameOfApplicant",
//         "fatherName",
//         "category",
//         "phoneNumber",
//         "phoneNumber1",
//         "withReferenceOf",
//         "requestType"
//       ],
//       order: [["createdAt", "DESC"]],
//       where: { isDocumentsSubmitted: true },
//       raw: true
//     });
//     console.log(1);
//     if (studentsData) {
//       for (let i = 0; i < studentsData.length; i++) {
//         let qualifyingDetails = await databases.eapcet.findOne({
//           attributes: ["EAPCETRank", "EAPCETHallTicketNo"],
//           where: { _student: studentsData[i].id },
//           raw: true
//         });
//         if (!qualifyingDetails) {
//           qualifyingDetails = {
//             EAPCETRank: "N/A",
//             EAPCETHallTicketNo: "N/A"
//           };
//         }
//         if (!qualifyingDetails.EAPCETRank) {
//           qualifyingDetails.EAPCETRank = "N/A";
//         }
//         if (!qualifyingDetails.EAPCETHallTicketNo) {
//           qualifyingDetails.EAPCETHallTicketNo = "N/A";
//         }
//         let studentsOriginalDoc = await databases.eapcetDecuments.findOne({
//           where: { _student: studentsData[i].id },
//           raw: true
//         });
//         console.log(2);
//         // console.log(studentsOriginalDoc);
//         let filteredDoc = {};
//         if (studentsOriginalDoc) {
//           for (const key in studentsOriginalDoc) {
//             if (studentsOriginalDoc[key] === "ORIGINAL") {
//               let newKey = key;
//               if (newKey === "HSCBonafideCertificate") {
//                 newKey = "INTER-BONAFIDE";
//               } else if (newKey === "castCertificate") {
//                 newKey = "CASTECERTIFICATE";
//               } else if (newKey === "SSCBonafideCertificate") {
//                 newKey = "SSC-BONAFIDE";
//               }
//               filteredDoc[newKey.toUpperCase()] = studentsOriginalDoc[key];
//             }
//           }
//         }
//         console.log(3);
//         studentsData[i].id = "YSR24" + studentsData[i].id;
//         studentsData[i].studentsOriginalDoc = filteredDoc;
//         studentsData[i].qualifyingDetails = qualifyingDetails;
//         studentsData[i].docSubmittedDate = studentsOriginalDoc?.date;
//       }
//       console.log(5);
//       return res.status(200).json({
//         success: true,
//         data: studentsData
//       });
//     }
//     console.log(4);
//     return res.status(404).json({
//       success: false,
//       message: `no record found`
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

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
        "phoneNumber1",
        "withReferenceOf",
        "requestType"
      ],
      order: [["createdAt", "DESC"]],
      where: { isDocumentsSubmitted: true },
      raw: true
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
        data: studentsData
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
        JSON.stringify(student.studentsOriginalDoc) // Convert object to string if needed
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
      await checkAndWriteHeaders(headerValues);
      await appendToSheet(values);
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

const getLoginPendingStudents = async (req, res) => {
  try {
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

const getLoggedinStudents = async (req, res) => {
  try {
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
      where: { isLoggedin: true },
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

const getOverviewsCount = async (req, res) => {
  try {
    let totalWalkIns = await databases.students.count();
    let totalCollectedDocs = await databases.eapcetDecuments.count();
    let totalLoggedIn = await databases.students.count({
      where: { isLoggedin: true }
    });
    let totalPendingLogIn = await databases.students.count({
      where: { isLoggedin: false }
    });
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
