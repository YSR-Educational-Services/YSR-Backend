const {
  craeteEmcetStudent,
  getEmcetStudentById,
  getListOfEmcet,
  getEmcetStudent
} = require("../controllers/EmcetControler");
const {
  createAdmin,
  adminLogin,
  addEmployees,
  getAllEmployees
} = require("../controllers/adminAuthController");

const {
  createStudentRegistration,
  createStudent,
  getAllStudentsData,
  createEapcetDocuments,
  getEapcetDocumentsById,
  getStudentDetailsById
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
router.get(
  "/admin/get-student-details-by-id/:studentId",
  getStudentDetailsById
);

router.post("/create-admin", createAdmin);
router.post("/admin/add-employees", addEmployees);
router.get("/admin/get-all-employees", getAllEmployees);

router.post("/user-login", adminLogin);

//=====================================================

router.post("/emcet-student-registration", craeteEmcetStudent);
router.get("/emcet-student-data/:id", auth, getEmcetStudentById);
router.get("/emcet-all-student-data", getListOfEmcet);
router.get("/search-emcet-student", auth, getEmcetStudent);

module.exports = router;
