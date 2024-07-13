const express = require("express");
const rahaf = require("../controller/rahaf");
const router = express.Router();
// router.get("/question", rahaf.getQuestions);
router.get("/tests" , rahaf.getTests);
router.get("/test/:testId", rahaf.getest);
router.post("/test",rahaf.addTest);
router.post("/deletTest/:testId", rahaf.deleteTest);
router.post("/addQuestion/:testId",rahaf.addQuestion);
module.exports = router;