import SearchFormPage from "./search-form";

export default function Units({
  searchParams,
}: {
  searchParams: Record<string, string | Array<string>>;
}) {
  return (
    <section className="relative py-16 lg:py-24">
      <div className="container">
        <div className="grid grid-cols-1 gap-[30px] md:grid-cols-12">
          <SearchFormPage searchParams={searchParams} />
        </div>
      </div>
    </section>
  );
}
