import { describe, it, expect, vi } from "vitest";
import { spawnHideShowButton, checkDataAttr } from "./hide-show-button";

describe("checkDataAttr", () => {
  const attrName = "data-toggle";
  it("should return true if data attribute is 'true'", () => {
    const divEl = document.createElement("div");
    divEl.setAttribute(attrName, "true");
    const result = checkDataAttr(divEl, attrName);
    expect(result).toBe(true);
  });
  it("should return false if data attribute is 'false'", () => {
    const divEl = document.createElement("button");
    divEl.setAttribute(attrName, "false");
    const result = checkDataAttr(divEl, attrName);
    expect(result).toBe(false);
  });
  it("should return false if data attribute is not set", () => {
    const divEl = document.createElement("div");
    const result = checkDataAttr(divEl, "data-invalid");
    expect(result).toBe(false);
  });
});

describe("spawnHideShowButton", () => {
  const baseText = "Show";
  const baseTextAfter = "Hide";
  const dataAttr = "data-hidden";
  const className = "my-btn-test";
  it("creates a button with correct initial state", () => {
    const btn = spawnHideShowButton(
      baseText,
      baseTextAfter,
      dataAttr,
      className
    );
    expect(btn.tagName).toBe("BUTTON");
    expect(btn.textContent).toBe(baseText);
    expect(btn.classList.contains("my-btn-test")).toBe(true);
    expect(btn.classList.contains("extension-added")).toBe(true);
    expect(btn.classList.contains("custom-button")).toBe(true);
    expect(btn.getAttribute(dataAttr)).toBe("false");
  });
  it("change attribute and text onClick", () => {
    const button = spawnHideShowButton(
      baseText,
      baseTextAfter,
      dataAttr,
      className
    );
    expect(button.textContent).toBe(baseText);
    expect(button.getAttribute(dataAttr)).toBe("false");
    button.click();
    expect(button.textContent).toBe(baseTextAfter);
    expect(button.getAttribute(dataAttr)).toBe("true");
    button.click();
    expect(button.textContent).toBe(baseText);
    expect(button.getAttribute(dataAttr)).toBe("false");
  });
  it("should call the listener callback on click", () => {
    const mockCallback = vi.fn();
    const button = spawnHideShowButton(
      baseText,
      baseTextAfter,
      dataAttr,
      className,
      mockCallback
    );
    button.click();
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});
