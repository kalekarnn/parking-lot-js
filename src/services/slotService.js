const slotModel = require("../models/slotModel");

const createSlot = async (slot) => {
  console.log(slot);
  return slotModel.createSlot(slot);
};

const deleteSlot = async (slot) => {
  return slotModel.deleteSlot(slot);
};

module.exports = {
  createSlot,
  deleteSlot,
};
