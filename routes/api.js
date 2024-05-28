const {
  craeteEmcetStudent,
  getEmcetStudentById
} = require("../controllers/EmcetControler");
const {
  createAdmin,
  adminLogin
} = require("../controllers/adminAuthController");
const {
  createStudentRegistration,
  getStudentDetailsById,
  getAllStudentsDetails
} = require("../controllers/studentRegistrationsController");

const router = require("express").Router();

router.post("/student-registrations", createStudentRegistration);
router.get("/student-details/:id", getStudentDetailsById);
router.get("/all-students-details", getAllStudentsDetails);

router.post("/emcet-student-registration", craeteEmcetStudent);
router.get("/emcet-student-data/:id", getEmcetStudentById);

router.post("/create-admin", createAdmin);
router.post("/user-login", adminLogin);

module.exports = router;
