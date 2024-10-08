
const databases = require("../config/databases");
const {
  checkAndWriteHeaders,
  appendToSheet
} = require("../helpers/googleSheet");

const moment = require("moment")

const createStudent = async (req, res) => {
  try {
    let inputData = req.body;
    const mappedReference = inputData.reference.map((reference) => {
      return `${reference.friendName}: ${reference.friendPhoneNumber}`;
    });
    if (!(inputData.requestType.toUpperCase() === "EAPCET")) {
      inputData.requestType.toUpperCase() = "EAPCET"
    }
    if (!(inputData.courseLevel.toUpperCase() === "B.TECH")) {
      inputData.courseLevel.toUpperCase() = "B.TECH"
    }
    let isStudentExist;
    if (inputData.requestType.toUpperCase() === "EAPCET") {
      isStudentExist = await databases.eapcet.findOne({
        where: {
          EAPCETHallTicketNo: inputData.qualifyingDetails[0].EAPCETHallTicketNo
        }
      });
    } else if (inputData.requestType.toUpperCase() === "ECET") {
      isStudentExist = await databases.ecet.findOne({
        where: {
          ECETHallTicketNo: inputData.qualifyingDetails[0].ECETHallTicketNo
        }
      });
    }
    if (isStudentExist) {
      return res.status(400).json({
        success: true,
        message: "Sorry This Hall Ticket Number is already Exist"
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
      courseName: inputData.courseName.map((course) => course).join(", "),
      nameofInstution: inputData.nameofInstution,
      withReferenceOf: inputData.withReferenceOf,
      reference: mappedReference.join(", ") || null
    });
    inputData.downloadLink = `https://ysredu.in/admin/get-student-details-by-id/YSR24${data.id}`;
    inputData.id = "YSR24" + data.id;
    let qualifyingDetails;
    var headerValues;
    let spreadsheetId;

    var values;
    if (inputData.requestType.toUpperCase() === "EAPCET") {
      qualifyingDetails = await databases.eapcet.create({
        sscSchoolName: inputData.qualifyingDetails[0].sscSchoolName,
        sscPassingYear: inputData.qualifyingDetails[0].sscPassingYear,
        sscPercentage: inputData.qualifyingDetails[0].sscPercentage,
        hscSchoolName: inputData.qualifyingDetails[0].hscSchoolName,
        hscPassingYear: inputData.qualifyingDetails[0].hscPassingYear,
        hscPercentage: inputData.qualifyingDetails[0].hscPercentage,
        EAPCETHallTicketNo: inputData.qualifyingDetails[0].EAPCETHallTicketNo,
        EAPCETRank: inputData.qualifyingDetails[0].EAPCETRank,
        _student: data.id
      });
      spreadsheetId = "1edepkSuyeylc8IEFf_ym22y56VDfHvkWrlYuUxeFUx8";
      values = [
        [
          inputData.id || " ",
          inputData.date || " ",
          inputData.nameOfApplicant || " ",
          inputData.fatherName || " ",
          inputData.dateOfBirth || " ",
          inputData.addressOfCommunication || " ",
          inputData.phoneNumber || " ",
          inputData.phoneNumber1 || " ",
          inputData.aadharNo || " ",
          inputData.category || " ",
          inputData.qualifyingDetails[0]?.sscSchoolName || " ",
          inputData.qualifyingDetails[0]?.sscPassingYear || " ",
          inputData.qualifyingDetails[0]?.sscPercentage || " ",
          inputData.qualifyingDetails[0]?.hscSchoolName || " ",
          inputData.qualifyingDetails[0]?.hscPassingYear || " ",
          inputData.qualifyingDetails[0]?.hscPercentage || " ",
          inputData.qualifyingDetails[0]?.EAPCETHallTicketNo || " ",
          inputData.qualifyingDetails[0]?.EAPCETRank || " ",
          inputData.nameofInstution || " ",
          data.courseName || " ",
          inputData.withReferenceOf || " ",
          mappedReference.join(", ") || null,
          inputData.downloadLink
        ]
      ];

      headerValues = [
        "YSR ID",
        "Date",
        "Name Of Applicant",
        "Father Name",
        "Date Of Birth",
        "Address Of Communication",
        "Phone Number",
        "Alternate Phone Number",
        "Aadhar No",
        "Category",
        "SSC School Name",
        "SSC Passing Year",
        "SSC Percentage",
        "HSC School Name",
        "HSC Passing Year",
        "HSC Percentage",
        "EAPCET Hall Ticket No",
        "EAPCET Rank",
        "Name Of Institution",
        "Course Name",
        "With Reference Of",
        "Reference",
        "Download_Link"
      ];
    } else if (inputData.requestType.toUpperCase() === "ECET") {
      qualifyingDetails = await databases.ecet.create({
        polytechnicClgName: inputData.qualifyingDetails[0].polytechnicClgName,
        polytechnicPassingYear:
          inputData.qualifyingDetails[0].polytechnicPassingYear,
        polytechnicPercentage:
          inputData.qualifyingDetails[0].polytechnicPercentage,
        ECETHallTicketNo: inputData.qualifyingDetails[0].ECETHallTicketNo,
        ECETRank: inputData.qualifyingDetails[0].ECETRank,
        _student: data.id
      });
      spreadsheetId = "1oX_vX8TWr_frO-ydcRkFpDpbdNMR4r8FJDU4HRiUBc0";
      values = [
        [
          inputData.id || " ",
          inputData.date || " ",
          inputData.nameOfApplicant || " ",
          inputData.fatherName || " ",
          inputData.dateOfBirth || " ",
          inputData.addressOfCommunication || " ",
          inputData.phoneNumber || " ",
          inputData.phoneNumber1 || " ",
          inputData.aadharNo || " ",
          inputData.category || " ",
          inputData.qualifyingDetails[0]?.polytechnicClgName || " ",
          inputData.qualifyingDetails[0]?.polytechnicPassingYear || " ",
          inputData.qualifyingDetails[0]?.polytechnicPercentage || " ",
          inputData.qualifyingDetails[0]?.ECETHallTicketNo || " ",
          inputData.qualifyingDetails[0]?.ECETRank || " ",
          inputData.nameofInstution || " ",
          data.courseName || " ",
          inputData.withReferenceOf || " ",
          mappedReference.join(", ") || null,
          inputData.downloadLink
        ]
      ];

      headerValues = [
        "YSR ID",
        "Date",
        "Name Of Applicant",
        "Father Name",
        "Date Of Birth",
        "Address Of Communication",
        "Phone Number",
        "Alternate Phone Number",
        "Aadhar No",
        "Category",
        "Polytechnic School Name",
        "Polytechnic Passing Year",
        "Polytechnic Percentage",
        "ECET Hall Ticket No",
        "ECET Rank",
        "Name Of Institution",
        "Course Name",
        "With Reference Of",
        "Reference",
        "Download_Link"
      ];
    }
    data.qualifyingDetails = qualifyingDetails;
    data.id = "YSR24" + data.id;
    await checkAndWriteHeaders(headerValues, spreadsheetId);
    await appendToSheet(values, spreadsheetId);

    if (data) {
      return res.status(200).json({
        success: true,
        data,
        message: "Registration Done"
      });
    }

    return res.status(400).json({
      success: false,
      message: "Registration Unsuccessful"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getAllStudentsData = async (req, res) => {
  try {
    const { requestType } = req.params;
    let studentsData;
    if (requestType.toUpperCase() === "ALL") {
      studentsData = await databases.students.findAll({
        attributes: [
          "id",
          "date",
          "nameOfApplicant",
          "fatherName",
          "category",
          "phoneNumber",
          "withReferenceOf",
          "requestType",
        ],
        order: [["createdAt", "DESC"]],
        raw: true
      });
    } else {
      studentsData = await databases.students.findAll({
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
        where: { requestType: requestType.toUpperCase() },
        raw: true
      });
    }

    if (studentsData) {
      for (let i = 0; i < studentsData.length; i++) {
        studentsData[i].id = "YSR24" + studentsData[i].id;
      }
      return res.status(200).json({
        success: true,
        data: studentsData
      });
    }
    return res.status(200).json({
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



const createEapcetDocuments = async (req, res) => {
  try {
    let inputData = req.body;
    inputData.studentId = inputData.studentId.substring(5);
    const { id, ...dataWithoutId } = inputData;
    if (!dataWithoutId) {
      return res.status(402).json({
        success: false,
        message: "Select alteast One documents."
      });
    }
    let isStudentExits = await databases.eapcetDecuments.findOne({
      where: { _student: inputData.studentId }
    });
    let documents;
    if (isStudentExits) {
      const updated = await databases.eapcetDecuments.update(
        {
          date: inputData.date,
          sscLongMemo: inputData.sscLongMemo,
          sscShortMemo: inputData.sscShortMemo,
          interLongMemo: inputData.interLongMemo,
          interShortMemo: inputData.interShortMemo,
          SSCBonafideCertificate: inputData.SSCBonafideCertificate,
          interTC: inputData.interTC,
          adhaarCardXerox: inputData.adhaarCardXerox,
          incomeCertificate: inputData.incomeCertificate,
          castCertificate: inputData.castCertificate,
          ROC: inputData.ROC,
          HSCBonafideCertificate: inputData.HSCBonafideCertificate,
          EAPCETHallTicket: inputData.EAPCETHallTicket,
          EAPCETRankCard: inputData.EAPCETRankCard
        },
        { where: { _student: inputData.studentId } }
      );
      if (updated) {
        // await databases.students.update({isDocumentsSubmitted: true}, {where: {id:inputData.studentId}})
        documents = await databases.eapcetDecuments.findOne({
          where: { _student: inputData.studentId }
        });
      }
    } else {
      documents = await databases.eapcetDecuments.create({
        date: inputData.date,
        sscLongMemo: inputData.sscLongMemo,
        sscShortMemo: inputData.sscShortMemo,
        interLongMemo: inputData.interLongMemo,
        interShortMemo: inputData.interShortMemo,
        SSCBonafideCertificate: inputData.SSCBonafideCertificate,
        interTC: inputData.interTC,
        adhaarCardXerox: inputData.adhaarCardXerox,
        incomeCertificate: inputData.incomeCertificate,
        castCertificate: inputData.castCertificate,
        ROC: inputData.ROC,
        HSCBonafideCertificate: inputData.HSCBonafideCertificate,
        EAPCETHallTicket: inputData.EAPCETHallTicket,
        EAPCETRankCard: inputData.EAPCETRankCard,
        _student: inputData.studentId
      });
    }
    if (documents) {
      let studentsOriginalDoc = await databases.eapcetDecuments.findOne({where: {_student: inputData.studentId}, raw:true});
      
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
     let student = await databases.students.findOne({where:{id: inputData.studentId},raw:true})
     let qualifying = await databases.eapcet.findOne({where: {_student: inputData.studentId}, raw:true})
      student.id = "YSR24" + student.id;
      student.studentsOriginalDoc = filteredDoc;
      student.docsDate = studentsOriginalDoc.date;
      var spreadsheetId = "1wchsToFbIfnar4M99bYS41ITJwNbVeIn5_Bfkkmxy-M";
      const values = [[
        student.id || " ",
        student.date || " ",
        student.nameOfApplicant || " ",
        student.fatherName || " ",
        student.dateOfBirth || " ",
        student.phoneNumber || " ",
        student.phoneNumber1 || " ",
        student.category || " ",
        qualifying.EAPCETHallTicketNo || " ",
        qualifying.EAPCETRank || " ",
        student.withReferenceOf || " ",
        student.docsDate || " ",
        JSON.stringify(student.studentsOriginalDoc || " ") 
      ]];
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
      await checkAndWriteHeaders(headerValues, spreadsheetId);
      await appendToSheet(values, spreadsheetId);
      
      await databases.students.update({isDocumentsSubmitted: true}, {where: {id:inputData.studentId}})
      return res.status(200).json({
        success: true,
        message: "Added Successfully.....",
        data: documents
      });
    }
    return res.status(402).json({
      success: false,
      message: "failed..........."
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const removeEapcetDocuments = async (req, res)=>{
  try {
    let {studentId} = req.params
    studentId = studentId.substring(5)

    let isStudentAvailable = await databases.eapcetDecuments.findOne({
      where:{_student:studentId}
    })
    if (!isStudentAvailable) {
      return res.status(404).json({
        success: false,
        message: `No Documents Submitted till now With this student YSR24${studentId}`
      })
    }
    const isDeleted = await databases.eapcetDecuments.destroy({ where:{_student:studentId}})
    if (isDeleted) {
      await databases.students.update({isDocumentsSubmitted:false},{where:{id:studentId}})
      return res.status(200).json({
        success: true,
        message: `Documents Details Deleted successfully..`
      })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}


const getEapcetDocumentsById = async (req, res) => {
  try {
    let _student = req.params.studentId;
    _student = _student.substring(5);
    let documentsDetails = await databases.eapcetDecuments.findOne({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: { _student },
      raw: true
    });
    if (documentsDetails) {
      return res.status(200).json({
        success: true,
        data: documentsDetails
      });
    }
    return res.status(200).json({
      success: true,
      data: null,
      message: "Data Not Found...."
    });
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
    let totalEapcetSubmittedDoc = await databases.eapcetDecuments.count();
    if (totalEapcetSubmittedDoc) {
      return res.status(200).json({
        success: true,
        data: totalEapcetSubmittedDoc
      });
    }
  } catch (error) {
    console.log(error.message);
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


const getStudentDetailsById = async (req, res) => {
  try {
    let _student = req.params.studentId;
    _student = _student.substring(5);
    let student = await databases.students.findOne({
      where: { id: _student },
      raw: true
    });
    if (student) {
      if (student.requestType == "EAPCET") {
        student.qualifyingDetails = await databases.eapcet.findOne({
          where: { _student },
          raw: true
        });
      } else if (student.requestType == "ECET") {
        student.qualifyingDetails = await databases.eapcet.findOne({
          where: { _student }
        });
      }
      student.id = "YSR24" + student.id;
      return res.status(200).json({
        success: true,
        data: student
      });
    }
    return res.status(404).json({
      success: false,
      data: null,
      message: "Data Not found....."
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const removeStudentsById = async (req, res) => {
  try {
    let { _student } = req.params;
    _student = _student.substring(5);
    const studentData = await databases.students.findOne({
      where: { id: _student },
      raw: true
    });
    if (studentData) {
      if (studentData.requestType?.toUpperCase() === "EAPCET") {
        await databases.eapcetDecuments.destroy({
          where: { _student: _student }
        });
        await databases.eapcet.destroy({
          where: { _student: _student }
        });
        await databases.students.destroy({
          where: { id: _student }
        });
      }
      if (studentData.requestType?.toUpperCase() === "ICET") {
        await databases.eapcetDecuments.destroy({
          where: { _student: _student }
        });
        await databases.eapcet.destroy({
          where: { _student: _student }
        });
        await databases.students.destroy({
          where: { id: _student }
        });
      }

      return res.status(200).json({
        success: true,
        message: "Data Deleted Successfully"
      });
      //add condition for ecet also
    }
    return res.status(200).json({
      success: false,
      message: "Record not found"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const updateStudentDetails = async (req, res) => {
  try {
    let inputData = req.body;
    let id = req.params.id;
    id = id.substring(5);
    let student = await databases.students.findOne({
      where: { id: id }
    });
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }
    await student.update({
      nameOfApplicant: inputData.nameOfApplicant,
      fatherName: inputData.fatherName,
      dateOfBirth: inputData.dateOfBirth,
      date: inputData.date,
      addressOfCommunication: inputData.addressOfCommunication,
      phoneNumber: inputData.phoneNumber,
      phoneNumber1: inputData.phoneNumber1,
      aadharNo: inputData.aadharNo,
      category: inputData.category,
      requestType: inputData.requestType?.toUpperCase(),
      nameofInstution: inputData.nameofInstution,
      withReferenceOf: inputData.withReferenceOf,
      reference: inputData.reference || null
    });
    let qualifyingDetails;
    let headerValues;
    let spreadsheetId;
    let values;
    // Update qualifying details based on request type
    if (inputData.requestType.toUpperCase() === "EAPCET") {
      qualifyingDetails = await databases.eapcet.findOne({
        where: { _student: id },
        raw: true
      });
      if (!qualifyingDetails) {
        qualifyingDetails = await databases.eapcet.create({
          sscSchoolName: inputData.qualifyingDetails.sscSchoolName,
          sscPassingYear: inputData.qualifyingDetails.sscPassingYear,
          sscPercentage: inputData.qualifyingDetails.sscPercentage,
          hscSchoolName: inputData.qualifyingDetails.hscSchoolName,
          hscPassingYear: inputData.qualifyingDetails.hscPassingYear,
          hscPercentage: inputData.qualifyingDetails.hscPercentage,
          EAPCETHallTicketNo: inputData.qualifyingDetails.EAPCETHallTicketNo,
          EAPCETRank: inputData.qualifyingDetails.EAPCETRank,
          _student: student.id
        });
      } else {
        await databases.eapcet.update(
          {
            sscSchoolName: inputData.qualifyingDetails.sscSchoolName,
            sscPassingYear: inputData.qualifyingDetails.sscPassingYear,
            sscPercentage: inputData.qualifyingDetails.sscPercentage,
            hscSchoolName: inputData.qualifyingDetails.hscSchoolName,
            hscPassingYear: inputData.qualifyingDetails.hscPassingYear,
            hscPercentage: inputData.qualifyingDetails.hscPercentage,
            EAPCETHallTicketNo: inputData.qualifyingDetails.EAPCETHallTicketNo,
            EAPCETRank: inputData.qualifyingDetails.EAPCETRank
          },
          { where: { _student: id } }
        );
      }
      spreadsheetId = "1edepkSuyeylc8IEFf_ym22y56VDfHvkWrlYuUxeFUx8";
      values = [
        [
          "YSR24" + id || " ",
          inputData.date || " ",
          inputData.nameOfApplicant || " ",
          inputData.fatherName || " ",
          inputData.dateOfBirth || " ",
          inputData.addressOfCommunication || " ",
          inputData.phoneNumber || " ",
          inputData.phoneNumber1 || " ",
          inputData.aadharNo || " ",
          inputData.category || " ",
          inputData.qualifyingDetails.sscSchoolName || " ",
          inputData.qualifyingDetails.sscPassingYear || " ",
          inputData.qualifyingDetails.sscPercentage || " ",
          inputData.qualifyingDetails.hscSchoolName || " ",
          inputData.qualifyingDetails.hscPassingYear || " ",
          inputData.qualifyingDetails.hscPercentage || " ",
          inputData.qualifyingDetails.EAPCETHallTicketNo || " ",
          inputData.qualifyingDetails.EAPCETRank || " ",
          inputData.nameofInstution || " ",
          student.courseName || " ",
          inputData.withReferenceOf || " ",
          inputData.reference || " ",
          inputData.downloadLink || " "
        ]
      ];

      headerValues = [
        "YSR ID",
        "Date",
        "Name Of Applicant",
        "Father Name",
        "Date Of Birth",
        "Address Of Communication",
        "Phone Number",
        "Alternate Phone Number",
        "Aadhar No",
        "Category",
        "SSC School Name",
        "SSC Passing Year",
        "SSC Percentage",
        "HSC School Name",
        "HSC Passing Year",
        "HSC Percentage",
        "EAPCET Hall Ticket No",
        "EAPCET Rank",
        "Name Of Institution",
        "Course Name",
        "With Reference Of",
        "Reference",
        "Download_Link"
      ];
    } else if (inputData.requestType.toUpperCase() === "ECET") {
      qualifyingDetails = await databases.ecet.findOne({
        where: { _student: student.id }
      });
      if (!qualifyingDetails) {
        qualifyingDetails = await databases.ecet.create({
          polytechnicClgName: inputData.qualifyingDetails.polytechnicClgName,
          polytechnicPassingYear:
            inputData.qualifyingDetails.polytechnicPassingYear,
          polytechnicPercentage:
            inputData.qualifyingDetails.polytechnicPercentage,
          ECETHallTicketNo: inputData.qualifyingDetails.ECETHallTicketNo,
          ECETRank: inputData.qualifyingDetails.ECETRank,
          _student: student.id
        });
      } else {
        await databases.ecet.update({
          polytechnicClgName: inputData.qualifyingDetails.polytechnicClgName,
          polytechnicPassingYear:
            inputData.qualifyingDetails.polytechnicPassingYear,
          polytechnicPercentage:
            inputData.qualifyingDetails.polytechnicPercentage,
          ECETHallTicketNo: inputData.qualifyingDetails.ECETHallTicketNo,
          ECETRank: inputData.qualifyingDetails.ECETRank
        });
      }

      spreadsheetId = "1oX_vX8TWr_frO-ydcRkFpDpbdNMR4r8FJDU4HRiUBc0";
      values = [
        [
          "YSR" + id || " ",
          inputData.date || " ",
          inputData.nameOfApplicant || " ",
          inputData.fatherName || " ",
          inputData.dateOfBirth || " ",
          inputData.addressOfCommunication || " ",
          inputData.phoneNumber || " ",
          inputData.phoneNumber1 || " ",
          inputData.aadharNo || " ",
          inputData.category || " ",
          inputData.qualifyingDetails.polytechnicClgName || " ",
          inputData.qualifyingDetails.polytechnicPassingYear || " ",
          inputData.qualifyingDetails.polytechnicPercentage || " ",
          inputData.qualifyingDetails.ECETHallTicketNo || " ",
          inputData.qualifyingDetails.ECETRank || " ",
          inputData.nameofInstution || " ",
          student.courseName || " ",
          inputData.withReferenceOf || " ",
          inputData.reference || " ",
          inputData.downloadLink || " "
        ]
      ];

      headerValues = [
        "YSR ID",
        "Date",
        "Name Of Applicant",
        "Father Name",
        "Date Of Birth",
        "Address Of Communication",
        "Phone Number",
        "Alternate Phone Number",
        "Aadhar No",
        "Category",
        "Polytechnic School Name",
        "Polytechnic Passing Year",
        "Polytechnic Percentage",
        "ECET Hall Ticket No",
        "ECET Rank",
        "Name Of Institution",
        "Course Name",
        "With Reference Of",
        "Reference",
        "Download_Link"
      ];
    }

    return res.status(200).json({
      success: true,
      data: student,
      message: "Update successful"
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const searchStudents = async (req, res) => {
  try {
    const { searchData } = req.params;
    if (searchData) {
      let students = await databases.students.findAll({
        where: {
          [Op.or]: [
            { nameOfApplicant: { [Op.like]: `%${searchData}%` } },
            { fatherName: { [Op.like]: `%${searchData}%` } },
            { withReferenceOf: { [Op.like]: `%${searchData}%` } },
            { phoneNumber: { [Op.like]: `%${searchData}%` } }
          ]
        },
        raw: true
      });
      if (students) {
        for (let i = 0; i < students.length; i++) {
          students[i].id = "YSR24" + students[i].id;
        }
        return res.status(200).json({
          success: true,
          data: students
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "Student not found..."
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const craeteLoginDetails = async(req, res)=>{
  try {
    let _student = req.params.studentId;
    _student =_student.substring(5);
    const inputData = req.body;
    let isStudentAvailable = await databases.students.findOne({where:{id:_student}})
    if (!isStudentAvailable) {
      return res.status(404).json({
        success: false,
        message: "Student not found..."
      })
    }
   let isLoginIdExist = await databases.loginDetails.findOne({
      where:{loginId:inputData.loginId} ,
      raw:true
    })
    if (isLoginIdExist) {
      return res.status(400).json({
        success: false,
        message: "Login Id Already Exist"
      })
    }
    const loginData = await databases.loginDetails.create({
      slotDate:inputData.slotDate,
      loginId:inputData.loginId,
      ROC: inputData.rocNumber,
      password:inputData.password,
      _student:_student})
    if (loginData) {
      await databases.students.update({
        isLoggedin:true
      },{where:{id:_student}})
      //create notifications
      let date = moment().subtract(10, 'days').calendar();
      let time = moment().format('LT');
      let title = "New Student Login Details Submitted";
      let body = `A student has successfully submitted their new login details on ${date} at ${time}. Please review and verify the information at your earliest convenience.`
      await databases.notifications.create({
        _student,
        time,
        title,
        body
      })

      return res.status(200).json({
        success: true,
        message: "Login Data Submited Successfully...."
      })
    }
    return res.status(200).json({
      success: false,
      message: "Login Data Submission failed...."
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}
module.exports = {
  createStudent,
  getAllStudentsData,
  createEapcetDocuments,
  getEapcetDocumentsById,
  getStudentDetailsById,
  getTotalCountOfSubmittedDoc,
  removeStudentsById,
  updateStudentDetails,
  searchStudents,
  craeteLoginDetails,
  removeEapcetDocuments
  // updateEapcetDocumentsById, // just for short term use 
};
