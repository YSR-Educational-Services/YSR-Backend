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

const getAllDocSubmittedStudentsData = async (req, res) => {
  try {
    let docSubmittedStudentIds = await databases.eapcetDecuments.findAll({
      order: [["createdAt", "DESC"]],
      raw: true
    });
    if (docSubmittedStudentIds) {
      for (let i = 0; i < docSubmittedStudentIds.length; i++) {
        let studentsData = await databases.students.findOne(
          {
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
            raw: true
          },
          { where: { id: docSubmittedStudentIds[i]._student } }
        );
        const qualifyingDetails = await databases.eapcet.findOne({
          attributes: ["EAPCETRank", "EAPCETHallTicketNo"],
          raw: true
        });
        studentsData.id = "YSR24" + studentsData[i].id;
        docSubmittedStudentIds[i].studentsData = studentsData;
        docSubmittedStudentIds[i].qualifyingDetails = qualifyingDetails;
      }
    }

    if (docSubmittedStudentIds >= 1) {
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

module.exports = {
  getAllDocSubmittedStudentsId
};
