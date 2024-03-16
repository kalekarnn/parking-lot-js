const parkingLot = require("../parking-lot/index");

const createSlot = async (data) => {
  try {
    // check if vehicle is already parked
    for (const floor of parkingLot.default.floors) {
      for (const s of floor.slots) {
        if (!s.available && s.vehicleRegNumber === data.vehicleRegNumber) {
          throw new Error("Vehicle is already parked");
        }
      }
    }

    // check if any slot is available
    let anySlotAvailable = false;

    for (const floor of parkingLot.default.floors) {
      for (const slot of floor.slots) {
        if (slot.available === true) {
          anySlotAvailable = true;
          break;
        }
      }
    }

    if (!anySlotAvailable) {
      throw new Error("Slot not available");
    }

    // find the first available slot and occupy it
    let currentSlot;
    let slotFound = false;

    for (const floor of parkingLot.default.floors) {
      if (slotFound) {
        break;
      }

      for (const slot of floor.slots) {
        if (slot.available === true) {
          slot.available = false;
          slot["vehicleRegNumber"] = data.vehicleRegNumber;
          slot["startTime"] = new Date();
          (slot["expiryTime"] = new Date(
            new Date().getTime() + data.duration * 60000
          )),
            (currentSlot = slot);
          slotFound = true;
          break;
        }
      }
    }

    return {
      slotNumber: currentSlot.name.split("-")[1],
      floorNumber: currentSlot.name.split("-")[0],
      vehicleRegNumber: data.vehicleRegNumber,
      startTime: currentSlot.startTime,
      expiryTime: currentSlot.expiryTime,
    };
  } catch (error) {
    throw error;
  }
};

const deleteSlot = async (data) => {
  try {
    // check if vehicle is already parked
    let vehicleFound = false;
    for (const floor of parkingLot.default.floors) {
      for (const s of floor.slots) {
        if (!s.available && s.vehicleRegNumber === data.vehicleRegNumber) {
          vehicleFound = true;
        }
      }
    }

    if (!vehicleFound) {
      throw new Error("Vehicle not found");
    }

    // free up the slot
    let currentSlot;
    for (const floor of parkingLot.default.floors) {
      for (const slot of floor.slots) {
        if (slot.vehicleRegNumber === data.vehicleRegNumber) {
          currentSlot = { ...slot };

          slot.available = true;
          slot.vehicleRegNumber = null;
          slot.startTime = null;
          slot.expiryTime = null;
        }
      }
    }

    return {
      slotNumber: currentSlot.name.split("-")[1],
      floorNumber: currentSlot.name.split("-")[0],
      vehicleRegNumber: data.vehicleRegNumber,
      startTime: currentSlot.startTime,
      expiryTime: currentSlot.expiryTime,
      actualParkedTimeInHrs: Math.ceil(
        (new Date() - currentSlot.startTime) / (1000 * 60 * 60)
      ),
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createSlot,
  deleteSlot,
};
