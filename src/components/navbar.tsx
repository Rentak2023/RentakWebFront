"use client"; // This is a client component 👈🏽
import Image from "next/image";
import { useLocale } from "next-intl";
import React, { useEffect, useState } from "react";

import logo from "@/app/[locale]/assets/images/Logo.png";
import { Button } from "@/components/ui/button";
import { Link, usePathname } from "@/navigation";

const routes = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Listing",
    path: "/listing",
  },
  {
    name: "Services",
    path: "/services",
    subRoutes: [
      {
        name: "Service 1",
        path: "/service-1",
      },
      {
        name: "Service 2",
        path: "/service-2",
      },
    ],
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

type NavbarProps = {
  navClass?: string;
  topnavClass?: string;
};

export default function Navbar({ navClass, topnavClass }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [topNavbar, setTopNavBar] = useState(false);

  const [menu, setMenu] = useState("");
  const [subMenu, setSubMenu] = useState("");

  const pathname = usePathname();
  const locale = useLocale();

  useEffect(() => {
    setMenu(pathname);
    setSubMenu(pathname);

    function windowScroll() {
      setTopNavBar(window.scrollY >= 50);
    }

    window.addEventListener("scroll", windowScroll);
    window.scrollTo(0, 0);
    return () => {
      window.removeEventListener("scroll", windowScroll);
    };
  }, [pathname]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <React.Fragment>
      <nav
        id="topnav"
        className={`${topNavbar ? "nav-sticky" : ""} ${topnavClass ?? ""}`}
      >
        <div className="container mx-auto flex px-4">
          {/* <!-- Start Mobile Toggle --> */}
          <div className="me-4 lg:hidden">
            <div className="border-slate-200">
              <Link href="#" className="navbar-toggle" onClick={toggleMenu}>
                <div className="lines">
                  <span />
                  <span />
                  <span />
                </div>
              </Link>
            </div>
          </div>
          {/* <!-- End Mobile Toggle --> */}
          <Link
            className="inline-flex items-center justify-center py-0"
            href="/"
          >
            <span className="sr-only">Rentak</span>
            <Image
              src={logo}
              className="h-8 w-auto"
              alt=""
              height={32}
              priority
            />
          </Link>

          <div
            id="navigation"
            className={`lg:ms-24 ${isOpen ? "hidden" : "open block"}`}
          >
            {/* <!-- Navigation Menu--> */}

            <ul
              className={`navigation-menu  ${navClass === "" || navClass === undefined ? "" : "nav-light"}   ${topnavClass !== "" && topnavClass !== undefined ? "justify-center" : "justify-end"}`}
            >
              {routes.map((route) => {
                const hasSubmenu = !!route.subRoutes;
                const checkedRoutes = hasSubmenu
                  ? [route.path, ...route.subRoutes.map((route) => route.path)]
                  : [route.path];

                return (
                  <li
                    key={route.name}
                    className={`${
                      hasSubmenu
                        ? "has-submenu parent-menu-item"
                        : "sub-menu-item"
                    } ${checkedRoutes.includes(menu) ? "active" : ""}`}
                  >
                    <Link
                      href={hasSubmenu ? "#" : route.path}
                      onClick={() => {
                        if (hasSubmenu) {
                          setSubMenu(subMenu === route.path ? "" : route.path);
                        }
                      }}
                      className={hasSubmenu ? "" : "sub-menu-item"}
                    >
                      {route.name}
                    </Link>
                    {hasSubmenu ? (
                      <>
                        <span className="menu-arrow" />
                        <ul
                          className={`submenu ${checkedRoutes.includes(subMenu) ? "open" : ""}`}
                        >
                          {route.subRoutes.map((subRoute) => (
                            <li
                              key={subRoute.name}
                              className={menu === subRoute.path ? "active" : ""}
                            >
                              <Link
                                href={subRoute.path}
                                className="sub-menu-item"
                              >
                                {subRoute.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </div>
          <ul className="mb-0 ms-auto flex list-none items-center justify-center">
            <li className="mb-0 inline">
              <Button asChild className="rounded-full" size="icon">
                <Link locale={locale === "ar" ? "en" : "ar"} href={pathname}>
                  {locale === "ar" ? "EN" : "ع"}
                </Link>
              </Button>
            </li>
            <li className="mb-0 ms-2 hidden sm:inline">
              <Button asChild size="lg" className="rounded-full">
                <Link href="/auth-signup">Login/Signup</Link>
              </Button>
            </li>
          </ul>
        </div>
      </nav>
      {/* End Navbar  */}
    </React.Fragment>
  );
}
