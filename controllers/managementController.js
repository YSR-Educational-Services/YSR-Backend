const databases = require("../config/databases");

const createManagement = async (req, res) => {
  try {
    const inputData = req.body;
    const mappedReference = inputData.reference.map((reference) => {
      return `${reference.friendName}: ${reference.friendPhoneNumber}`;
    });
    let isStudentExist = await databases.students.findOne({
      where: { phoneNumber: inputData.phoneNumber }
    });
    if (isStudentExist) {
      return res.status(400).json({
        success: true,
        message: "Data already Exist with this number"
      });
    }
    const submittedData = await databases.students.create({
      nameOfApplicant: inputData.nameOfApplicant,
      fatherName: inputData.fatherName,
      dateOfBirth: inputData.dateOfBirth,
      addressOfCommunication: inputData.addressOfCommunication,
      phoneNumber: inputData.phoneNumber,
      phoneNumber1: inputData.phoneNumber1,
      aadharNo: inputData.aadharNo,
      category: "N/A",
      date: inputData.date,
      courseLevel: inputData.courseLevel,
      requestType: inputData.requestType?.toUpperCase(),
      courseName: inputData.courseName.map((course) => course).join(", "),
      nameofInstution: inputData.nameofInstution,
      withReferenceOf: inputData.withReferenceOf,
      reference: mappedReference.join(", ") || null
    });
    if (submittedData) {
      let qulificationData = await databases.management.create({
        _student: submittedData.id,
        courseLevel: inputData.qualifyingDetails[0].courseLevel,
        clgName: inputData.qualifyingDetails[0].clgName,
        passingYear: inputData.qualifyingDetails[0].passingYear,
        percentage: inputData.qualifyingDetails[0].percentage
      });
      if (qulificationData) {
        let studentData = await databases.students.findOne({
          where: { id: submittedData.id },
          raw: true
        });
        studentData.id = "YSR24" + studentData.id;
        studentData.qualifyingDetails = qulificationData;
        return res.status(200).json({
          success: true,
          data: studentData,
          message: "Registration completed successfully."
        });
      }
      return res.status(401).json({
        success: false,
        message: "Somthing wrong qulifying details not submitted "
      });
    }
    return res.status(401).json({
      success: false,
      message: "Somthing wrong Student details not submitted "
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error
    });
  }
};

module.exports = {
  createManagement
};
