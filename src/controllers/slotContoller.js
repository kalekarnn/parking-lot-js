const slotService = require("../services/slotService");

const createSlot = async (req, res) => {
  try {
    //validation
    if (!req.body.vehicleRegNumber) {
      throw new Error("Vehicle registration number is required");
    }

    if (!req.body.duration) {
      throw new Error("Duration is required");
    }

    // create slot
    const slot = await slotService.createSlot(req.body);
    res.status(201).json(slot);
  } catch (error) {
    if (error.message === "Vehicle registration number is required") {
      return res.status(400).json({ message: error.message });
    }

    if (error.message === "Duration is required") {
      return res.status(400).json({ message: error.message });
    }

    if (error.message === "Vehicle is already parked") {
      return res.status(409).json({ message: error.message });
    }

    if (error.message === "Slot not available") {
      return res.status(409).json({ message: error.message });
    }

    res.status(500).json({ message: error.message });
  }
};

const deleteSlot = async (req, res) => {
  try {
    //validation
    if (!req.body.vehicleRegNumber) {
      throw new Error("Vehicle registration number is required");
    }
    // delete slot
    const slot = await slotService.deleteSlot(req.body);
    res.status(200).json(slot);
  } catch (error) {
    if (error.message === "Vehicle registration number is required") {
      return res.status(400).json({ message: error.message });
    }

    if (error.message === "Vehicle not found") {
      return res.status(404).json({ message: error.message });
    }

    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createSlot,
  deleteSlot,
};
