const {
  craeteEmcetStudent,
  getEmcetStudentById,
  getListOfEmcet,
  getEmcetStudent
} = require("../controllers/EmcetControler");
const {
  createAdmin,
  adminLogin
} = require("../controllers/adminAuthController");
const {
  craeteEcetStudent,
  getEcetStudentById,
  getListOfEcet,
  getEcetStudent
} = require("../controllers/ecetController");
const {
  createStudentRegistration,
  getStudentDetailsById,
  getAllStudentsDetails
} = require("../controllers/studentRegistrationsController");
const { auth } = require("../middlewares/auth");

const router = require("express").Router();

router.post("/student-registrations", createStudentRegistration);
router.get("/student-details/:id", getStudentDetailsById);
router.get("/all-students-details", getAllStudentsDetails);

router.post("/ecet-student-registration", craeteEcetStudent);
router.get("/ecet-student-data/:id", auth, getEcetStudentById);
router.get("/ecet-all-student-data", auth, getListOfEcet);
router.get("/search-ecet-student", auth, getEcetStudent);

router.post("/emcet-student-registration", craeteEmcetStudent);
router.get("/emcet-student-data/:id", auth, getEmcetStudentById);
router.get("/emcet-all-student-data", auth, getListOfEmcet);
router.get("/search-emcet-student", auth, getEmcetStudent);

router.post("/create-admin", createAdmin);
router.post("/user-login", adminLogin);

module.exports = router;
