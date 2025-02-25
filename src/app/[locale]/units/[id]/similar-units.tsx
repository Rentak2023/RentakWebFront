import { Suspense } from "react";

import SectionTitle from "@/components/home/components/section-title";
import UnitsSkeleton from "@/components/home/units/units-skeleton";
import UnitsSlider from "@/components/home/units/units-slider";
import Container from "@/components/ui/container";
import { Link } from "@/i18n/routing";
import URLS from "@/shared/urls";

function SimilarUnits() {
  return (
    <Container>
      <SectionTitle text="Similar Units" />

      <div className="mt-8 flex">
        <Link
          className="ms-auto text-base font-medium text-slate-700 underline"
          href={URLS.units}
        >
          View All Units
        </Link>
      </div>
      <div className="mt-4">
        <Suspense fallback={<UnitsSkeleton />}>
          <UnitsSlider />
        </Suspense>
      </div>
    </Container>
  );
}

export default SimilarUnits;
