import Features from "./components/features";
import Header from "./components/header";
import Pricing from "./components/pricing";
import WhyRentak from "./components/why-rentak";

const Landlord = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <WhyRentak />
      <Features />
      <Pricing />
    </main>
  );
};

export default Landlord;
