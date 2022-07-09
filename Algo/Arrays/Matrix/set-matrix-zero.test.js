const { setMatrixZero } = require('./set-matrix-zero');

describe('set matrix zero (setMatrixZero) test suite', () => {
  it('should return unchanged matrix', () => {
    const input = [
      [1, 1, 1],
      [2, 3, 4],
      [4, 5, 6],
    ];
    expect(setMatrixZero(input)).toEqual(expect.arrayContaining(input));
  });

  it('should return matrix with all items zero', () => {
    const input = [
      [0, 1, 1],
      [2, 0, 4],
      [4, 5, 0],
    ];
    expect(setMatrixZero(input)).toEqual(
      expect.arrayContaining([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ])
    );
  });

  it('should make first column and first row zero', () => {
    const input = [
      [0, 1, 1],
      [2, 1, 4],
      [4, 1, 1],
    ];
    expect(setMatrixZero(input)).toEqual(
      expect.arrayContaining([
        [0, 0, 0],
        [0, 1, 4],
        [0, 1, 1],
      ])
    );
  });

  it('should make first row, and 2nd column zero', () => {
    const input = [
      [1, 0, 1],
      [2, 1, 4],
      [4, 1, 1],
    ];
    expect(setMatrixZero(input)).toEqual(
      expect.arrayContaining([
        [0, 0, 0],
        [2, 0, 4],
        [4, 0, 1],
      ])
    );
  });

  it('should make 2nd row, and 2nd column zero', () => {
    const input = [
      [1, 5, 1],
      [2, 0, 4],
      [4, 1, 1],
    ];
    expect(setMatrixZero(input)).toEqual(
      expect.arrayContaining([
        [1, 0, 1],
        [0, 0, 0],
        [4, 0, 1],
      ])
    );
  });
});
