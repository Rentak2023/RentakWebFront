import { getLocale } from "next-intl/server";

import PropertiesPage from "../properties";
import SearchForm from "./search-form";

const SearchFormPage = async ({
  searchParams,
}: {
  searchParams: Record<string, string | Array<string>>;
}) => {
  const locale = await getLocale();
  const params = new URLSearchParams(searchParams as Record<string, string>);

  if (!params.has("page")) {
    params.set("page", "1");
  }

  return (
    <>
      <SearchForm />
      <PropertiesPage searchParams={params.toString()} locale={locale} />
    </>
  );
};

export default SearchFormPage;
