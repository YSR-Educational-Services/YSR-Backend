const express = require("express");
const {
  craeteEmcetStudent,
  getEmcetStudentById,
  getListOfEmcet,
  getEmcetStudent,
  updateDocumentsTable,
  addWalkInsStudentsSheet
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
  searchStudents,
  craeteLoginDetails,
  removeEapcetDocuments
} = require("../controllers/studentRegistrationsController");
const { auth } = require("../middlewares/auth");
const { createManagement } = require("../controllers/managementController");

const router = express.Router();

router.post("/student-registrations", createStudentRegistration);
router.post("/create-student-registration", createStudent);
router.get(
  "/admin/allType-students-data/:requestType",
  auth,
  getAllStudentsData
);
router.post("/admin/add-student-documents", createEapcetDocuments);
router.get(
  "/admin/student-documents-by-student-id/:studentId",
  auth,
  getEapcetDocumentsById
);
router.get(
  "/get-student-details-by-id/:studentId",
  auth,
  getStudentDetailsById
);
router.post("/create-admin", auth, createAdmin);
router.post("/admin/add-employees", auth, addEmployees);
router.get("/admin/get-all-employees", auth, getAllEmployees);
router.delete("/admin/remove-employee-by-id/:id", auth, removeEmployees);
router.put("/admin/update-employee-by-id", auth, updateEmployeeDetails);
router.get("/admin/total-doc-submitted", auth, getTotalCountOfSubmittedDoc);
router.delete("/admin/delete-student/:_student", auth, removeStudentsById);
router.put("/admin/update-student/:id", auth, updateStudentDetails);
router.get("/admin/search-student/:searchData", auth, searchStudents);
router.get(
  "/admin/documents-submitted-data",
  auth,
  getAllDocSubmittedStudentsData
);
router.get("/admin/walk-ins-students", auth, getAllWalkInsStudents);
router.post("/user-login", adminLogin);
router.get("/add-details-in-google-sheet", auth, getAllStudentsDetails); // this just temp file
router.get("/admin/login-pendding-students", auth, getLoginPendingStudents);
router.get("/admin/loggedin-students", auth, getLoggedinStudents);
router.get("/admin/add-login-data/:studentId", auth, craeteLoginDetails);

router.get("/admin/dashboard/overview-count", auth, getOverviewsCount);

router.post("/emcet-student-registration", craeteEmcetStudent);
router.get("/emcet-student-data/:id", auth, getEmcetStudentById);
router.get("/emcet-all-student-data", auth, getListOfEmcet);
router.get("/search-emcet-student", auth, getEmcetStudent);
router.get("/total-submitted-doc-ids", auth, getAllDocSubmittedStudentsId);
// router.put("/admin/update-eapcet-doc/:id", updateEapcetDocumentsById);

router.post("/create-management-student", createManagement);

router.put("/update-table", updateDocumentsTable);
router.delete(
  "/admin/eapcet-documents-delete/:studentId",
  removeEapcetDocuments
);
router.get("/walkIns", addWalkInsStudentsSheet);
router.get("*", (req, res) => {
  res.send("<h1>Bad Credentail URL Not found  </h1>");
});

///////////////////////////////////////////////

module.exports = router;
