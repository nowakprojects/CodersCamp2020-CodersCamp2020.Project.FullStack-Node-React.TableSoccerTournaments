import { TableNumber } from '../../../../../src/modules/tournament-tables/core/domain/TableNumber';

describe('Table number', function () {
  it('When table number is less than 1, then error should be thrown', async () => {
    const raw = 0;
    expect(() => TableNumber.from(raw)).toThrowError('Table number should be equal at least 1 and at most 200.');
  });
  it('When table number is more than 200, then error should be thrown', async () => {
    const raw = 201;
    expect(() => TableNumber.from(raw)).toThrowError('Table number should be equal at least 1 and at most 200.');
  });
  it('When table number is not an integer, then error should be thrown', async () => {
    const raw = 2.5;
    expect(() => TableNumber.from(raw)).toThrowError('Table number should be an integer.');
  });
  it('When table number is between 1 and 200, then correct number is return', async () => {
    const rawMin = 1;
    const rawMax = 200;
    expect(TableNumber.from(rawMin)).toBeInstanceOf(TableNumber);
    expect(TableNumber.from(rawMax)).toBeInstanceOf(TableNumber);
  });
});
