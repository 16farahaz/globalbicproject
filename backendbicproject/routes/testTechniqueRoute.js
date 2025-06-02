const express = require("express");
const router = express.Router();
const controller = require("../controllers/testtechniqueController");

router.post("/", controller.createTestTechnique);
router.get("/", controller.getAllTestsTechnique);
router.get("/user/:userId", controller.getTestsByUserId);
router.get("/:id", controller.getTestTechniqueById);
router.put("/update/:id", controller.updateTestTechnique);
router.delete("/:id", controller.deleteTestTechnique);

module.exports = router;
