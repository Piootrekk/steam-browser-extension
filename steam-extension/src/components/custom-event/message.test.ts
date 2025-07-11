import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { sendInterceptMessage } from "./message";

describe(" ", () => {
  let eventHandler: ReturnType<typeof vi.fn>;
  const customEventName = "custom-event-test";
  beforeEach(() => {
    eventHandler = vi.fn();
    document.addEventListener(customEventName, eventHandler);
  });

  afterEach(() => {
    document.removeEventListener(customEventName, eventHandler);
    vi.clearAllMocks();
  });

  it("should emit custom event without data", () => {
    sendInterceptMessage(customEventName);
    expect(eventHandler).toHaveBeenCalled();
  });
  it("should emit custom event with specific data", () => {
    const mockBody = { testData: true, id: 1 };
    sendInterceptMessage(customEventName, mockBody);
    expect(eventHandler).toHaveBeenCalled();
    expect(eventHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        type: customEventName,
        detail: mockBody,
      })
    );
  });
  it("should have correct CustomEvent type", () => {
    const mockBody = { testData: true, testNested: { yes: true } };
    sendInterceptMessage(customEventName, mockBody);
    expect(eventHandler).toBeCalledTimes(1);
    const eventArg = eventHandler.mock.calls[0][0];
    expect(eventArg).toBeInstanceOf(CustomEvent);
    expect(eventArg instanceof CustomEvent).toBe(true);
    expect(eventArg.bubbles).toBe(false);
    expect(eventArg.cancelable).toBe(false);
    const customEvent = eventArg as CustomEvent<typeof mockBody>;
    expect(customEvent.type).toBe(customEventName);
    expect(customEvent.detail).toBe(mockBody);

    console.log(eventArg.detail);
  });
});
