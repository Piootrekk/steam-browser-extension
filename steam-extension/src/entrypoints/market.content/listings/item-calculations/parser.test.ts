import { describe, expect, it } from "vitest";
import { getAmountFromName, parseValueToNumber } from "./perser";

describe("Value Parser to Number (parseValueToNumber)", () => {
  type TestCase = { input: string | null | undefined; expected: number };
  const testCases: TestCase[] = [
    { input: null, expected: 0 },
    { input: undefined, expected: 0 },
    { input: "", expected: 0 },
    { input: "0", expected: 0 },
    { input: "1", expected: 1 },
    { input: "1.15", expected: 1.15 },
    { input: "1,15 zł", expected: 1.15 },
    { input: "2 500,50 zł", expected: 2500.5 },
    { input: "$396.63 USD", expected: 396.63 },
    { input: "invalid", expected: 0 },
  ];
  it.each(testCases)(
    "should parse $input and return $expected",
    ({ input, expected }) => {
      expect(parseValueToNumber(input)).toBe(expected);
    }
  );
});

describe("Value parser to first number (getAmountFromName)", () => {
  type TestCase = { input: string | null | undefined; expected: number | null };
  const testCases: TestCase[] = [
    {
      input: "3 Constellations Small Box",
      expected: 3,
    },
    {
      input: "3dmax",
      expected: null,
    },
    {
      input: null,
      expected: null,
    },
    {
      input: "12 Glacial Visage Sleeping Bag",
      expected: 12,
    },
    {
      input: "Item 12 out",
      expected: null,
    },
    {
      input: "12",
      expected: null,
    },
  ];
  it.each(testCases)(
    `should parse $input and return $expected `,
    ({ input, expected }) => {
      expect(getAmountFromName(input)).toBe(expected);
    }
  );
});
