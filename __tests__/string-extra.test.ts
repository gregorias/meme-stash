import { fuzzyMatch } from "../src/string-extra";

describe("fuzzyMatch", () => {
  it('fuzzyMatch("", "what-the-fuck")', () => {
    expect(fuzzyMatch("", "what-the-fuck")).toBeTruthy();
  });
  it('fuzzyMatch("wtf", "what-the-fuck")', () => {
    expect(fuzzyMatch("wtf", "what-the-fuck")).toBeTruthy();
  });
  it('!fuzzyMatch("osi", "iso")', () => {
    expect(fuzzyMatch("osi", "iso")).toBeFalsy();
  });
  it('fuzzyMatch("what-the-fuck", "what-the-fuck")', () => {
    expect(fuzzyMatch("what-the-fuck", "what-the-fuck")).toBeTruthy();
  });
});
