"use client";

import { useEffect, useState } from "react";

export type CounterProps = {
  target: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
  /** Prefixo opcional (ex: "+") */
  prefix?: string;
};

export default function Counter({
  target,
  suffix = "",
  decimals = 0,
  duration = 2000,
  prefix = "",
}: CounterProps) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const id = `counter-${target}-${suffix}`;

  useEffect(() => {
    if (started) return;

    const element = document.getElementById(id);
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();

          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const progress = Math.min(
              (currentTime - startTime) / duration,
              1
            );
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(target * easeOut);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [started, target, duration, id]);

  return (
    <strong id={id} data-testid="counter">
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </strong>
  );
}
