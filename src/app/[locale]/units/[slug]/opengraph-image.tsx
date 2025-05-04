import "@/lib/orpc.server";

/* eslint "@eslint-react/dom/no-unknown-property": ["warn", { ignore: ["tw"] }] */
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";

import { orpcClient } from "@/lib/orpc";
import { getIdFromSlug } from "@/services/properties";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

async function loadFont() {
  const url = `https://api.fontshare.com/v2/css?f[]=general-sans@500`;
  const res = await fetch(url);
  const css = await res.text();

  const resource = /url\('(.+)'\) format\('(opentype|truetype)'\)/.exec(css);

  if (resource) {
    const response = await fetch(`https:${resource[1]}`);
    if (response.status == 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error("failed to load font data");
}

// Image generation
export default async function Image(
  props: Readonly<{
    params: Promise<{ slug: string }>;
  }>,
) {
  const params = await props.params;
  const { slug } = params;

  const id = getIdFromSlug(slug);

  const property = await orpcClient.units.find({
    id,
    lang: "en",
  });

  if (property == null) {
    notFound();
  }

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div tw="h-full w-full flex items-start justify-start">
        <div tw="flex items-start justify-start h-full">
          <div tw="flex w-2/5 flex-col justify-between h-full pl-12 py-12 bg-slate-50">
            <div tw="flex flex-col">
              <img src="https://rentakapp.com/images/logo.png" tw="w-48" />
            </div>
            <h1 tw="text-5xl text-left mt-auto">{property.property_name}</h1>
          </div>
          {property.gallary[0] ? (
            <div tw="flex w-3/5 h-full">
              <img
                tw="w-full h-full"
                style={{ objectFit: "cover" }}
                src={property.gallary[0].url}
              />
            </div>
          ) : null}
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
          name: "General Sans",
          data: await loadFont(),
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
