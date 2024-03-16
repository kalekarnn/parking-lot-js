import ParkingLot from './index';

describe('parking lot', () => {
  it('has 3 floors', () => {
    expect(ParkingLot.floors.length).toBe(3);
  });

  it('has 4 slots in every floor, and all slots are available', () => {
    for (let floor of ParkingLot.floors) {
      expect(floor.slots.length).toBe(4);

      for (let slot of floor.slots) {
        expect(slot.available).toBe(true);
      }
    }
  });
});