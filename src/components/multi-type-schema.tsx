import { deepmerge } from "deepmerge-ts";
import type { Thing, WithContext } from "schema-dts";

export function MultiTypeSchema({
  things,
}: {
  things: Array<WithContext<Thing>>;
}) {
  return (
    <script type="application/ld+json">
      {JSON.stringify(
        deepmerge(
          ...things.map((thing) => {
            if ("@type" in thing && typeof thing["@type"] === "string") {
              return {
                ...thing,
                "@type": [thing["@type"]],
              };
            }

            return thing;
          }),
        ),
      )}
    </script>
  );
}
