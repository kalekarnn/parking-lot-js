const express = require("express");
const router = express.Router();

const slotController = require("../controllers/slotContoller");

router.post("/slots", slotController.createSlot);
router.delete("/slots", slotController.deleteSlot);

module.exports = router;
