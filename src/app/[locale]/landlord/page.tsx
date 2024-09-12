import Features from "./components/features";
import Header from "./components/header";
import Pricing from "./components/pricing";
import Steps from "./components/steps";
import WhyRentak from "./components/why-rentak";

const Landlord = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <WhyRentak />
      <Features />
      <Pricing />
      <Steps />
    </main>
  );
};

export default Landlord;
