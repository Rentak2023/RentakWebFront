"use client"; // This is a client component 👈🏽
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

import logo from "@/app/[locale]/assets/images/Logo.png";
import { Button } from "@/components/ui/button";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const locale = useLocale();

  const [isOpen, setIsOpen] = useState(true);

  const [menu, setMenu] = useState("");
  const [subMenu, setSubMenu] = useState("");

  const t = useTranslations("navbar");

  const routes: Array<{
    name: string;
    path: string;
    subRoutes?: Array<{
      name: string;
      path: string;
      disabled?: boolean;
    }>;
  }> = [
    {
      name: t("home"),
      path: "/",
    },
    {
      name: t("listing"),
      path: "/listing",
      subRoutes: [
        {
          name: t("long-term"),
          path: "/units",
        },
        {
          name: t("short-term"),
          path: "/service-2",
          disabled: true,
        },
      ],
    },
    {
      name: t("services"),
      path: "/services",
      subRoutes: [
        {
          name: t("manage-property"),
          path: "/rent-management",
        },
        {
          name: t("rent-payment"),
          path: "/rent-payment",
        },
        {
          name: t("maintenance-payment"),
          path: "/maintenance-payment",
        },
        {
          name: t("rent-collection"),
          path: "/rent-collection",
        },
        {
          name: t("free-contract"),
          path: "/contract",
        },
      ],
    },
    {
      name: t("contact"),
      path: "/#contact",
    },
  ];

  useEffect(() => {
    setMenu(pathname);
    setSubMenu(pathname);
  }, [pathname]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <React.Fragment>
      <nav id="topnav" className="nav-sticky">
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

            <ul className="navigation-menu">
              {routes.map((route) => {
                const hasSubmenu = Boolean(route.subRoutes);
                const checkedRoutes = route.subRoutes
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
                    {route.subRoutes ? (
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
                                className={cn(
                                  "sub-menu-item",
                                  subRoute.disabled &&
                                    "disabled pointer-events-none !text-slate-400",
                                )}
                                aria-disabled={subRoute.disabled}
                                tabIndex={subRoute.disabled ? -1 : undefined}
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
                <Link locale={locale === "en" ? "ar-EG" : "en"} href={pathname}>
                  {locale === "en" ? "ع" : "EN"}
                </Link>
              </Button>
            </li>
            <li className="mb-0 ms-2 hidden sm:inline">
              <Button asChild size="lg" className="rounded-full">
                <Link href="/login-register">Login/Signup</Link>
              </Button>
            </li>
          </ul>
        </div>
      </nav>
      {/* End Navbar  */}
    </React.Fragment>
  );
}
