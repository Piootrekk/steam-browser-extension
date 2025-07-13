import { vi } from "vitest";

const getMockFetchObject = (
  url: string,
  status: number,
  mockDataResponse: string
) => {
  const mockFn = vi.fn().mockResolvedValue({
    status: status,
    url: vi.fn().mockResolvedValue(url),
    text: vi.fn().mockResolvedValue(mockDataResponse),
    clone: vi.fn().mockReturnValue({
      text: vi.fn().mockResolvedValue(mockDataResponse),
      url: vi.fn().mockResolvedValue(url),
    }),
  });
  return mockFn;
};

const getMockXHRObject = (
  mockUrl: string,
  status: number,
  mockDataResponse: string
) => {
  function MockXHR(this: XMLHttpRequest) {
    this.open = vi.fn();
    this.setRequestHeader = vi.fn();
    this.addEventListener = vi.fn((event, cb) => {
      if (event === "load") {
        this.onload = cb;
      }
    });
    this.send = vi.fn(() => {
      if (this.onload) {
        this.onload(new ProgressEvent("load"));
      }
    });
  }

  Object.defineProperty(MockXHR.prototype, "responseURL", {
    get() {
      return mockUrl;
    },
  });

  Object.defineProperty(MockXHR.prototype, "status", {
    get() {
      return status;
    },
  });

  Object.defineProperty(MockXHR.prototype, "response", {
    get() {
      return mockDataResponse;
    },
  });

  return MockXHR as unknown as typeof XMLHttpRequest;
};

export { getMockXHRObject, getMockFetchObject };
