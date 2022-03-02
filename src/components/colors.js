export const COLORS = {
  black: "#121814",
  brown: "#604127",
  red: "#c3022e",
  orange: "#ed7c35",
  yellow: "#ffcc22",
  green: "#7fc97f",
  blue: "#4c60b0",
  purple: "#7b3294",
  silver: "#bdbdbd",
  white: "#ffffff",
};

const COLOR_VALUES = {
  black: 0,
  brown: 1,
  red: 2,
  orange: 3,
  yellow: 4,
  green: 5,
  blue: 6,
  purple: 7,
  silver: 8,
  white: 9,
};
const DIVISORS = {
  K: 1000,
  M: 1000000,
  G: 1000000000,
};

const bigValues = (value) => {
  value = parseInt(value, 10);
  if (value < 999) return "";
  return value <= 999_999 ? "K" : value <= 999_999_999 ? "M" : "G";
};
/**
 *
 * @param {Number} value
 * @returns {String}
 */
export function parseValue(value) {
  let valueSize = value.toString().length;
  if (valueSize < 4 || value < 999) return value;
  if (value.toString().includes("."))
    valueSize = value.toString().split(".")[0].length;
  let multiplier = "1".padEnd(valueSize, "0");
  multiplier = parseInt(multiplier, 10);
  const simbol = bigValues(multiplier);
  const divisor = !isNaN(DIVISORS[simbol]) ? DIVISORS[simbol] : 1;
  const result = value / divisor;
  return `${result}${simbol}`;
}
export class Resistor {
  constructor() {
    this.band1 = COLORS.brown;
    this.band2 = COLORS.black;
    this.band3 = COLORS.red;
    this.band4 = COLORS.yellow;
  }

  setBandColor(band, color) {
    this[`band${band}`] = COLORS[color];
  }

  getColor(band) {
    return this[`band${band}`];
  }

  getMultiplier() {
    const value = this.bandValue(this.band3);
    const multiplier = "1".padEnd(value > 0 ? value + 1 : value, "0");
    return 1 * parseInt(multiplier, 10);
  }

  bandValue(band) {
    const colorToFind = band.length === 1 ? this.getColor(band) : band;
    const bandColor = Object.entries(COLORS).find(
      ([key, color]) => color === colorToFind
    )[0];
    return COLOR_VALUES[bandColor];
  }

  value() {
    const bands = [this.band1, this.band2];
    let value = bands.reduce((acc, band) => acc + this.bandValue(band), "");
    value = parseInt(value, 10) * this.getMultiplier();
    return parseValue(value);
  }
}
