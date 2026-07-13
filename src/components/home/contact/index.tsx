import Container from "@/components/ui/container";

import ContactForm from "./contact-form";
import FAQ from "./faq";

function Contact() {
  return (
    <Container className="relative py-16 lg:py-24">
      <div className="mt-12 flex flex-col items-stretch gap-8 lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
        {/* Left Side - FAQ */}
        <div className="flex h-full flex-col justify-start">
          <FAQ />
        </div>

        {/* Right Side - Contact Form */}
        <div className="flex h-full flex-col justify-start">
          <div className="rounded-md bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <ContactForm />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Contact;
