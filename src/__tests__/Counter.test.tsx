import { render, screen, waitFor } from "@testing-library/react";
import Counter from "@/components/Counter";

// IntersectionObserver mock
class MockIntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds: number[] = [];
  private callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }

  observe(target: Element) {
    this.callback(
      [
        {
          isIntersecting: true,
          target,
          intersectionRatio: 1,
          time: 0,
          boundingClientRect: {} as DOMRectReadOnly,
          intersectionRect: {} as DOMRectReadOnly,
          rootBounds: null,
        },
      ],
      this as unknown as IntersectionObserver
    );
  }

  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

beforeAll(() => {
  global.IntersectionObserver =
    MockIntersectionObserver as unknown as typeof IntersectionObserver;
});

describe("Counter", () => {
  it("renderiza o valor inicial e anima até o target", async () => {
    render(<Counter target={100} duration={100} />);

    const el = screen.getByTestId("counter");
    expect(el).toBeInTheDocument();

    await waitFor(
      () => {
        expect(el.textContent).toBe("100");
      },
      { timeout: 2000 }
    );
  });

  it("aplica suffix e decimals", async () => {
    render(<Counter target={8.4} decimals={1} suffix=" kg" duration={50} />);

    const el = screen.getByTestId("counter");

    await waitFor(
      () => {
        expect(el.textContent).toMatch(/8\.4 kg/);
      },
      { timeout: 2000 }
    );
  });

  it("aplica prefix", async () => {
    render(<Counter target={10} prefix="+" duration={50} />);

    const el = screen.getByTestId("counter");

    await waitFor(
      () => {
        expect(el.textContent).toMatch(/^\+10/);
      },
      { timeout: 2000 }
    );
  });
});
