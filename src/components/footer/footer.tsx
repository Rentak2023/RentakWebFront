import Copyright from "./footer-copyright";
import Links from "./links";
import Logo from "./logo";

export default function Footer() {
  return (
    <footer className="relative mt-24">
      <div className="container mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1">
          <div className="relative py-16">
            <div className="relative w-full">
              <div className="-mt-24 grid grid-cols-1 gap-[30px] md:grid-cols-12">
                <Logo />
                <Links />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Copyright />
    </footer>
  );
}
