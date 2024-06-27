import { unstable_setRequestLocale } from "next-intl/server";

import PropertiesPage from "@/components/units/properties";
import SearchForm from "@/components/units/search-form/search-form";
import { getCities, getMinMaxPrice } from "@/services/properties";

const getMinMaxPriceHandler = async () => {
  const minMaxPrice = await getMinMaxPrice();

  return [minMaxPrice.min_price, minMaxPrice.max_price] as const;
};

const getCitiesHandler = async () => {
  const cities = await getCities();
  const formattedCities = cities.map((city) => ({
    label: city.governorate_name,
    value: city.governorate_id,
  }));

  return formattedCities;
};

export default async function UnitsPage({
  params: { locale },
  searchParams,
}: Readonly<{
  params: { locale: string };
  searchParams: Record<string, string | Array<string>>;
}>) {
  unstable_setRequestLocale(locale);
  const params = new URLSearchParams(searchParams as Record<string, string>);

  const [minPrice, maxPrice] = await getMinMaxPriceHandler();
  const cities = await getCitiesHandler();

  return (
    <main className="min-h-screen">
      <section className="relative py-16 lg:py-24">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <SearchForm
              minPrice={minPrice}
              maxPrice={maxPrice}
              cities={cities}
            />
            <PropertiesPage searchParams={params.toString()} locale={locale} />
          </div>
        </div>
      </section>
    </main>
  );
}
