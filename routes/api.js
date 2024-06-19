const {
  craeteEmcetStudent,
  getEmcetStudentById,
  getListOfEmcet,
  getEmcetStudent
} = require("../controllers/EmcetController");
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
  updateStudentDetails
} = require("../controllers/studentRegistrationsController");
const { auth } = require("../middlewares/auth");

const router = require("express").Router();

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

router.post("/user-login", adminLogin);

//=====================================================

router.post("/emcet-student-registration", craeteEmcetStudent);
router.get("/emcet-student-data/:id", auth, getEmcetStudentById);
router.get("/emcet-all-student-data", getListOfEmcet);
router.get("/search-emcet-student", auth, getEmcetStudent);

module.exports = router;
