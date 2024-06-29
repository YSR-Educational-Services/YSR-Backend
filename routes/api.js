const express = require("express");
const {
  craeteEmcetStudent,
  getEmcetStudentById,
  getListOfEmcet,
  getEmcetStudent,
  updateDocumentsTable
} = require("../controllers/EapcetController");
const {
  getAllDocSubmittedStudentsData,
  getAllStudentsDetails,
  getAllWalkInsStudents,
  getLoginPendingStudents,
  getLoggedinStudents,
  getAllDocSubmittedStudentsId,
  getOverviewsCount
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
const { createManagement } = require("../controllers/managementController");

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
router.get("/add-details-in-google-sheet", getAllStudentsDetails); // this just temp file
router.get("/admin/login-pendding-students", getLoginPendingStudents);
router.get("/admin/loggedin-students", getLoggedinStudents);
router.get("/admin/dashboard/overview-count", getOverviewsCount);

router.post("/emcet-student-registration", craeteEmcetStudent);
router.get("/emcet-student-data/:id", getEmcetStudentById);
router.get("/emcet-all-student-data", getListOfEmcet);
router.get("/search-emcet-student", getEmcetStudent);
router.get("/total-submitted-doc-ids", getAllDocSubmittedStudentsId);
// router.put("/admin/update-eapcet-doc/:id", updateEapcetDocumentsById);

router.post("/create-management-student", createManagement);

router.put("/update-table", updateDocumentsTable);

router.get("*", (req, res) => {
  res.send("<h1>Bad Credentail URL Not found  </h1>");
});

module.exports = router;
