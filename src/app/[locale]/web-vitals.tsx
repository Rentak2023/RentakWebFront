"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
  useReportWebVitals((metric) => {
    sendGAEvent("event", metric.name, {
      // Built-in params:
      value: metric.delta, // Use `delta` so the value can be summed.
      // Custom params:
      metric_id: metric.id, // Needed to aggregate events.
      metric_value: metric.value, // Optional.
      metric_delta: metric.delta, // Optional.

      // OPTIONAL: any additional params or debug info here.
      // See: https://web.dev/articles/debug-performance-in-the-field
      metric_rating: metric.rating,
      // debug_info: '...',
      // ...
    });
  });
  return null;
}
