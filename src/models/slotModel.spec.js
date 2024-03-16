const { createSlot, deleteSlot } = require("./slotModel");

jest.mock("../parking-lot/index", () => ({
  default: {
    floors: [
      {
        name: "P1",
        slots: [
          {
            name: "P1-S1",
            available: true,
          },
          {
            name: "P1-S2",
            available: true,
          },
        ],
      },
    ],
  },
}));

describe("createSlot", () => {
  it("should throw an error if vehicle registration number is not provided", async () => {
    const data = {
      duration: 1,
    };

    try {
      await createSlot(data);
    } catch (error) {
      expect(error.message).toBe("Vehicle registration number is required");
    }
  });

  it("should throw an error if duration is not provided", async () => {
    const data = {
      vehicleRegNumber: "120",
    };

    try {
      await createSlot(data);
    } catch (error) {
      expect(error.message).toBe("Duration is required");
    }
  });

  it("should throw an error if vehicle is already parked", async () => {
    const data = {
      vehicleRegNumber: "121",
      duration: 1,
    };

    await createSlot(data);

    try {
      await createSlot(data);
    } catch (error) {
      expect(error.message).toBe("Vehicle is already parked");
    }
  });

  it("should throw an error if parking lot is full", async () => {
    const data1 = {
      vehicleRegNumber: "122",
      duration: 1,
    };

    await createSlot(data1);

    const data2 = {
      vehicleRegNumber: "123",
      duration: 1,
    };

    await createSlot(data2);

    const data3 = {
      vehicleRegNumber: "124",
      duration: 1,
    };

    try {
      await createSlot(data3);
    } catch (error) {
      expect(error.message).toBe("Slot not available");
    }
  });

  it("should create a slot for a vehicle and return its details", async () => {
    const data = {
      vehicleRegNumber: "125",
      duration: 1,
    };

    const result = await createSlot(data);

    expect(result.slotNumber).toBeDefined();
    expect(result.floorNumber).toBeDefined();
    expect(result.vehicleRegNumber).toBe(data.vehicleRegNumber);
    expect(result.startTime).toBeDefined();
    expect(result.expiryTime).toBeDefined();
  });
});

describe("deleteSlot", () => {
  it("should throw an error if vehicle registration number is not provided", async () => {
    const data = {};

    try {
      await deleteSlot(data);
    } catch (error) {
      expect(error.message).toBe("Vehicle registration number is required");
    }
  });

  it("should throw an error if vehicle is not found", async () => {
    const data = {
      vehicleRegNumber: "126",
    };

    try {
      await deleteSlot(data);
    } catch (error) {
      expect(error.message).toBe("Vehicle not found");
    }
  });

  it("should delete a slot for a vehicle and return its details", async () => {
    const inputData = {
      vehicleRegNumber: "127",
      duration: 1,
    };

    await createSlot(inputData);

    const data = {
      vehicleRegNumber: "127",
    };

    const result = await deleteSlot(data);

    expect(result.slotNumber).toBeDefined();
    expect(result.floorNumber).toBeDefined();
    expect(result.vehicleRegNumber).toBe(data.vehicleRegNumber);
    expect(result.startTime).toBeDefined();
    expect(result.expiryTime).toBeDefined();
    expect(result.actualParkedTimeInHrs).toBeDefined();
  });
});
