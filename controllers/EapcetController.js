const moment = require("moment");
const databases = require("../config/databases");
const { where } = require("sequelize");
const { raw } = require("body-parser");
const {
  checkAndWriteHeaders,
  appendToSheet
} = require("../helpers/googleSheet");

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

const updateDocumentsTable = async (req, res) => {
  try {
    let students = [
      "YSR24347",
      "YSR24141",
      "YSR24142",
      "YSR24145",
      "YSR24148",
      "YSR24151",
      "YSR24134",
      "YSR24161",
      "YSR2451",
      "YSR24225",
      "YSR24162",
      "YSR24160",
      "YSR24165",
      "YSR24166",
      "YSR24167",
      "YSR24288",
      "YSR24204",
      "YSR24210",
      "YSR24129",
      "YSR24130",
      "YSR2424",
      "YSR2425",
      "YSR2426",
      "YSR246",
      "YSR244",
      "YSR2419",
      "YSR2413",
      "YSR245",
      "YSR2427",
      "YSR2428",
      "YSR2434",
      "YSR2435",
      "YSR2436",
      "YSR2437",
      "YSR2420",
      "YSR2448",
      "YSR2430",
      "YSR2433",
      "YSR2440",
      "YSR2442",
      "YSR24216",
      "YSR24209",
      "YSR24199",
      "YSR24197",
      "YSR24194",
      "YSR24192",
      "YSR24183",
      "YSR24177",
      "YSR24176",
      "YSR24174",
      "YSR24181",
      "YSR24193",
      "YSR24198",
      "YSR24280",
      "YSR24170",
      "YSR24171",
      "YSR24172",
      "YSR24179",
      "YSR24184",
      "YSR24248",
      "YSR24246",
      "YSR24208",
      "YSR24173",
      "YSR24175",
      "YSR24276",
      "YSR24251",
      "YSR24207",
      "YSR24213",
      "YSR24221",
      "YSR24252",
      "YSR24257",
      "YSR24263",
      "YSR24268",
      "YSR24274",
      "YSR24281",
      "YSR24287",
      "YSR24227",
      "YSR24233",
      "YSR24242",
      "YSR24136",
      "YSR24135",
      "YSR24133",
      "YSR24132",
      "YSR2443",
      "YSR2444",
      "YSR2445",
      "YSR2447",
      "YSR2449",
      "YSR24292",
      "YSR24294",
      "YSR24301",
      "YSR24299",
      "YSR24298",
      "YSR24291",
      "YSR24309",
      "YSR24314",
      "YSR24316",
      "YSR24318",
      "YSR24324",
      "YSR24332",
      "YSR24329",
      "YSR24340",
      "YSR24330",
      "YSR2450",
      "YSR24335",
      "YSR24337",
      "YSR24339",
      "YSR24334",
      "YSR24357",
      "YSR24360",
      "YSR24362",
      "YSR24352",
      "YSR24353",
      "YSR24348",
      "YSR24350",
      "YSR24322",
      "YSR24399",
      "YSR24386",
      "YSR24385",
      "YSR24387",
      "YSR24398",
      "YSR24397",
      "YSR24396",
      "YSR24395",
      "YSR24400",
      "YSR24421",
      "YSR24376",
      "YSR24375",
      "YSR24430",
      "YSR24429",
      "YSR24435",
      "YSR24437",
      "YSR24441",
      "YSR24451",
      "YSR24390",
      "YSR24365",
      "YSR24453",
      "YSR24383",
      "YSR24448",
      "YSR24379",
      "YSR24459",
      "YSR24458",
      "YSR24457",
      "YSR24449",
      "YSR24456",
      "YSR24455",
      "YSR24454",
      "YSR24452",
      "YSR24417",
      "YSR24413",
      "YSR24411",
      "YSR24428",
      "YSR24420",
      "YSR24427",
      "YSR24460",
      "YSR24270",
      "YSR24462",
      "YSR24462",
      "YSR24461",
      "YSR24463",
      "YSR24464",
      "YSR24415",
      "YSR24466",
      "YSR24468",
      "YSR24470",
      "YSR24471",
      "YSR249",
      "YSR24164",
      "YSR24488",
      "YSR24500",
      "YSR24486",
      "YSR24487",
      "YSR24489",
      "YSR24490",
      "YSR24491",
      "YSR24492",
      "YSR24496",
      "YSR24498",
      "YSR24499",
      "YSR24502",
      "YSR24195",
      "YSR24480",
      "YSR24358",
      "YSR24418",
      "YSR24426",
      "YSR24425",
      "YSR24481"
    ];
    let dates = [
      "2024-06-20",
      "2024-05-24",
      "2024-05-25",
      "2024-05-25",
      "2024-05-22",
      "2024-05-23",
      "2024-06-16",
      "2024-06-16",
      "2024-06-16",
      "2024-05-29",
      "2024-05-23",
      "2024-05-25",
      "2024-06-16",
      "2024-06-16",
      "2024-06-16",
      "2024-05-28",
      "2024-06-13",
      "2024-06-13",
      "2024-05-25",
      "2024-05-20",
      "2024-05-23",
      "2024-05-22",
      "2024-06-04",
      "2024-05-17",
      "2024-05-22",
      "2024-05-23",
      "2024-05-15",
      "2024-05-23",
      "2024-05-22",
      "2024-06-15",
      "2024-06-15",
      "2024-06-13",
      "2024-05-24",
      "2024-05-23",
      "2024-06-15",
      "2024-06-15",
      "2024-06-15",
      "2024-06-15",
      "2024-06-14",
      "2024-06-17",
      "2024-06-17",
      "2024-06-17",
      "2024-06-17",
      "2024-06-17",
      "2024-05-18",
      "2024-06-17",
      "2024-06-17",
      "2024-06-18",
      "2024-06-18",
      "2024-06-18",
      "2024-06-19",
      "2024-06-19",
      "2024-06-19",
      "2024-06-19",
      "2024-06-20",
      "2024-06-19",
      "2024-06-19",
      "2024-06-19",
      "2024-06-19",
      "2024-06-22",
      "2024-06-22",
      "2024-06-22",
      "2024-06-21",
      "2024-06-21",
      "2024-06-21",
      "2024-06-21",
      "2024-06-18",
      "2024-06-15",
      "2024-06-23",
      "2024-06-23",
      "2024-06-23",
      "2024-06-20",
      "2024-06-22",
      "2024-06-22",
      "2024-05-30",
      "2024-06-19",
      "2024-06-24",
      "2024-06-23",
      "2024-06-23",
      "2024-06-24",
      "2024-06-24",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-23",
      "2024-06-23",
      "2024-06-22",
      "2024-06-22",
      "2024-06-22",
      "2024-06-22",
      "2024-06-22",
      "2024-06-22",
      "2024-06-23",
      "2024-06-23",
      "2024-06-23",
      "2024-06-23",
      "2024-06-23",
      "2024-06-23",
      "2024-06-23",
      "2024-06-23",
      "2024-06-23",
      "2024-06-23",
      "2024-06-24",
      "2024-06-24",
      "2024-06-24",
      "2024-06-24",
      "2024-06-24",
      "2024-06-24",
      "2024-06-24",
      "2024-06-24",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25",
      "2024-06-25"
    ];
    let arr = 0;
    for (let i = 0; i < students.length; i++) {
      let studentId = students[i].substring(5);
      let updateDate = dates[i];

      // Validate date format
      if (!moment(updateDate, "YYYY-MM-DD", true).isValid()) {
        console.error(
          `Invalid date format for student ${studentId}: ${updateDate}`
        );
        continue;
      }

      // Update database
      arr += await databases.students.update(
        { date: updateDate },
        { where: { id: studentId } }
      );
      console.log(`Updated ${studentId}, and date ${updateDate}`);
    }
    return res.status(200).json({
      success: true,
      message: "updated"
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const addWalkInsStudentsSheet = async (req, res) => {
  try {
    let students = await databases.students.findAll({ raw: true });
    for (let i = 0; i < students.length; i++) {
      students[i].qualifyingDetails = await databases.eapcet.findOne({
        where: { _student: students[i].id },
        raw: true
      });
      students[
        i
      ].downloadLink = `https://ysredu.in/admin/get-student-details-by-id/YSR24${students[i].id}`;
      students[i].id = "YSR24" + students[i].id;
      students[i].courseLevel = "B.TECH";
    }
    var headerValues;

    let spreadsheetId = "1edepkSuyeylc8IEFf_ym22y56VDfHvkWrlYuUxeFUx8";
    const values = students.map((student) => [
      student.id || " ",
      student.date || " ",
      student.nameOfApplicant || " ",
      student.fatherName || " ",
      student.dateOfBirth || " ",
      student.addressOfCommunication || " ",
      student.phoneNumber || " ",
      student.phoneNumber1 || " ",
      student.aadharNo || " ",
      student.category || " ",
      student.qualifyingDetails?.sscSchoolName || " ",
      student.qualifyingDetails?.sscPassingYear || " ",
      student.qualifyingDetails?.sscPercentage || " ",
      student.qualifyingDetails?.hscSchoolName || " ",
      student.qualifyingDetails?.hscPassingYear || " ",
      student.qualifyingDetails?.hscPercentage || " ",
      student.qualifyingDetails?.EAPCETHallTicketNo || " ",
      student.qualifyingDetails?.EAPCETRank || " ",
      student.nameofInstution || " ",
      student.courseName || " ",
      student.withReferenceOf || " ",
      student.reference || " ",
      student.downloadLink
    ]);

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
    await checkAndWriteHeaders(headerValues, spreadsheetId);
    await appendToSheet(values, spreadsheetId);

    if (students) {
      return res.status(200).json({
        success: true,
        message: "Registration Done",
        students
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

module.exports = {
  craeteEmcetStudent,
  getEmcetStudentById,
  getListOfEmcet,
  getEmcetStudent,
  updateDocumentsTable,
  addWalkInsStudentsSheet
};
