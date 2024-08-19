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
  adminLogin,
  changePassword
} = require("../controllers/adminAuthController");
const {
  addEmployees,
  getAllEmployees,
  removeEmployees,
  updateEmployeeDetails,
  topPerformance,
  totalPerformanceDaywise
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
const {
  getUnReadNotifications,
  readNotificationById,
  getAllNotifications,
  removeNotificationById,
  totalUnreadNotifications
} = require("../controllers/notificationsController");
const {
  createIcetStudent,
  createCollege,
  getAllColleges,
  getAllIcetWalkInsStudents
} = require("../controllers/icetStudentsControllers");
const { getAllEcetWalkInsStudents } = require("../controllers/ecetController");

const router = express.Router();

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
router.get("/admin/EAPCET/walk-ins-students/", getAllWalkInsStudents);
router.get("/admin/login-pendding-students", getLoginPendingStudents);
router.get("/admin/loggedin-students/:page", getLoggedinStudents);

router.post("/admin/add-login-data/:studentId", craeteLoginDetails);
router.post("/user-login", adminLogin);
router.post("/admin/change-password", changePassword);

router.get("/add-details-in-google-sheet", getAllStudentsDetails); // this just temp file

router.get("/admin/dashboard/overview-count/:examType", getOverviewsCount);

router.post("/emcet-student-registration", craeteEmcetStudent);
router.get("/emcet-student-data/:id", getEmcetStudentById);
router.get("/emcet-all-student-data", getListOfEmcet);
router.get("/search-emcet-student", getEmcetStudent);
router.get("/total-submitted-doc-ids", getAllDocSubmittedStudentsId);
// router.put("/admin/update-eapcet-doc/:id", updateEapcetDocumentsById);

router.post("/create-management-student", createManagement);

router.put("/update-table", updateDocumentsTable);
router.delete(
  "/admin/eapcet-documents-delete/:studentId",
  removeEapcetDocuments
);
router.get("/walkIns", addWalkInsStudentsSheet);

//employees
router.get("/admin/top-performance", topPerformance);
router.get("/admin/total-performance/day-wise", totalPerformanceDaywise);
//notifications
router.get("/admin/notifications/unread", getUnReadNotifications);
router.get("/admin/notifications-count/unread", totalUnreadNotifications);
router.put("/admin/notifications/:id/read", readNotificationById);
router.get("/admin/notifications", getAllNotifications);
router.delete("/admin/notifications/:id", removeNotificationById);

// ICET
router.post("/admin/create-icet-students", createIcetStudent);
router.get("/admin/ICET/walk-ins-students/", getAllIcetWalkInsStudents);

router.post("/admin/created-college", createCollege);
router.get("/admin/colleges", getAllColleges);
//ECET
router.get("/admin/ECET/walk-ins-students/", getAllEcetWalkInsStudents);
//default
router.get("*", (req, res) => {
  res.send("<h1>Bad Credentail URL Not found  </h1>");
});

module.exports = router;
