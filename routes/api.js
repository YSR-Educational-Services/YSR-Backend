const express = require("express");
const {
  craeteEmcetStudent,
  getEmcetStudentById,
  getListOfEmcet,
  getEmcetStudent
} = require("../controllers/EmcetController");
const {
  getAllDocSubmittedStudentsData,
  getAllStudentsDetails,
  getAllWalkInsStudents
} = require("../controllers/OverviewsController");

const {
  createAdmin,
  adminLogin
} = require("../controllers/adminAuthController");
const {
  addEmployees,
  getAllEmployees,
  removeEmployees,
  updateEmployeeDetails
} = require("../controllers/employeesController");

const {
  createStudentRegistration,
  createStudent,
  getAllStudentsData,
  createEapcetDocuments,
  getEapcetDocumentsById,
  getStudentDetailsById,
  getTotalCountOfSubmittedDoc,
  removeStudentsById,
  updateStudentDetails,
  searchStudents
} = require("../controllers/studentRegistrationsController");
const { auth } = require("../middlewares/auth");

const router = express.Router();

router.post("/student-registrations", createStudentRegistration);
router.post("/create-student-registration", createStudent);
router.get("/admin/allType-students-data/:requestType", getAllStudentsData);
router.post("/admin/add-student-documents", createEapcetDocuments);
router.get(
  "/admin/student-documents-by-student-id/:studentId",
  getEapcetDocumentsById
);
router.get("/get-student-details-by-id/:studentId", getStudentDetailsById);
router.post("/create-admin", createAdmin);
router.post("/admin/add-employees", addEmployees);
router.get("/admin/get-all-employees", getAllEmployees);
router.delete("/admin/remove-employee-by-id/:id", removeEmployees);
router.put("/admin/update-employee-by-id", updateEmployeeDetails);
router.get("/admin/total-doc-submitted", getTotalCountOfSubmittedDoc);
router.delete("/admin/delete-student/:_student", removeStudentsById);
router.put("/admin/update-student/:id", updateStudentDetails);
router.get("/admin/search-student/:searchData", searchStudents);
router.get("/admin/documents-submitted-data", getAllDocSubmittedStudentsData);
router.get("/admin/walk-ins-students", getAllWalkInsStudents);
router.post("/user-login", adminLogin);
router.get("/add-details-in-google-sheet", getAllStudentsDetails);

router.post("/emcet-student-registration", craeteEmcetStudent);
router.get("/emcet-student-data/:id", getEmcetStudentById);
router.get("/emcet-all-student-data", getListOfEmcet);
router.get("/search-emcet-student", getEmcetStudent);
// router.get("/total-submitted-doc", getTodtalCountOfSubmittedDoc);

router.get("*", (req, res) => {
  res.send("<h1>Bad Credentail URL Not found  </h1>");
});

module.exports = router;
