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
    console.log(adminType);

    await databases.emcetStudent.findAll({
      attributes: { exclude: ["craetedAt", "updatedAt"] },
      order: [["createdAt", "DESC"]]
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
module.exports = { craeteEmcetStudent, getEmcetStudentById };
