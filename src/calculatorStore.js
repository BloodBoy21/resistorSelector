import { writable } from "svelte/store";
import { parseValue } from "./components/colors";
export let storeFE = writable({});

export class Resistor {
  constructor(value, multiplier) {
    this._value = this._parseValue(value, multiplier);
  }
  setValue(value, multiplier) {
    this._value = this._parseValue(value, multiplier);
  }
  _parseValue(value, multiplier) {
    value = parseInt(value, 10);
    multiplier = parseInt(multiplier, 10);
    return value * multiplier;
  }
  get value() {
    return this._value;
  }
}

export class Calculator {
  constructor() {
    this.resistors = [];
    this._mode = "serie";
  }
  addResistance(resistance) {
    this.resistors.push(resistance);
  }
  deleteResistance() {
    this.resistors.pop();
  }
  /**
   * @param {string} modeValue
   */
  set mode(modeValue) {
    this._mode = modeValue;
  }
  get mode() {
    return this._mode;
  }
  getEquivalence() {
    let value = 0;
    if (this.mode === "serie") {
      value = this.resistors.reduce((acc, resistor) => acc + resistor.value, 0);
    } else {
      value =
        1 /
        this.resistors.reduce((acc, { value }) => {
          if (value === 0) return acc;
          return acc + 1 / value;
        }, 0);
    }
    if (value === Infinity || value === 0) return "";
    if (value.toString().includes(".")) value = parseFloat(value.toFixed(5));
    return parseValue(value);
  }
}
