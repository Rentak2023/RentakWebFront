import { readFile } from "node:fs/promises";
import path from "node:path";

import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import type { Locale } from "next-intl";

import { getProperty } from "@/services/properties";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image(
  props: Readonly<{
    params: Promise<{ locale: Locale; id: string }>;
  }>,
) {
  const params = await props.params;
  const { id } = params;

  const property = await getProperty(id, "en");

  if (property == null || property.gallary.length === 0) {
    notFound();
  }
  // Load font - process.cwd() is Next.js project directory
  const generalSans = await readFile(
    path.join(
      process.cwd(),
      "src/app/[locale]/assets/fonts/GeneralSans-Semibold.otf",
    ),
  );

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#fff",
          position: "relative",
        }}
      >
        {/* Background Image */}
        <img
          src={property.gallary.at(0)?.url ?? ""}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.7)",
          }}
        />

        {/* Content Container */}
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "4rem",
            width: "100%",
            height: "100%",
            padding: "2rem",
            color: "#fff",
            textAlign: "center",
          }}
        >
          {/* Website Logo */}
          <img
            src="https://rentakapp.com/images/logo.png"
            style={{
              width: "200px",
              marginTop: "1rem",
            }}
          />

          {/* Property Name */}
          <h1
            style={{
              fontSize: "4rem",
              marginBottom: "1rem",
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            {property.property_name}
          </h1>
        </div>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: "GeneralSans",
          data: generalSans,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
