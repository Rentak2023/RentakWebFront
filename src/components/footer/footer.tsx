import Container from "../ui/container";
import Copyright from "./footer-copyright";
import Links from "./links";
import Logo from "./logo";

export default function Footer() {
  return (
    <footer className="mt-24">
      <Container>
        <div className="grid grid-cols-1">
          <div className="py-16">
            <div className="w-full">
              <div className="-mt-24 grid grid-cols-1 justify-between gap-8 md:grid-cols-[repeat(3,minmax(1fr,auto))] lg:grid-cols-[16rem_repeat(3,auto)] lg:gap-2 xl:grid-cols-[24rem_repeat(3,auto)]">
                <Logo />
                <Links />
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Copyright />
    </footer>
  );
}
