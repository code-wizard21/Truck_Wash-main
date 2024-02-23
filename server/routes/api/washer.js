const express = require("express");
const router = express.Router();

const washController = require("../../controller/washController");

router.post("/register", washController.Register);
router.get("/getAllList", washController.getAllList);
router.post("/getAcceptList", washController.getAcceptList);
router.get("/getAllWashed", washController.getAllWashed);
router.post("/setSelectWashed", washController.setSelectWashed);


module.exports = router;
