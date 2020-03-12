import { TestComponent } from './test.component';

describe('TestComponent', () => {

  it('should return ["R", "N"] if input is ".-." ', () => {
    // Arrange
    const test = new TestComponent();
    // Act
    const morseArrayDecode = test.possibilities('.-.');
    // Assert
    expect(morseArrayDecode).toEqual(['R', 'N']);

  });
});
