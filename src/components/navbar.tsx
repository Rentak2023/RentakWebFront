"use client";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useDeleteCookie } from "cookies-next/client";
import {
  ChevronDownIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  MenuIcon,
  UserIcon,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

import logo from "@/app/[locale]/assets/images/Logo.png";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { userLoggedInQuery } from "@/queries/user";

import Container from "./ui/container";

function NavRight() {
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();
  const deleteCookie = useDeleteCookie();

  const queryCLient = useQueryClient();

  const { data: isLoggedIn } = useQuery(userLoggedInQuery);

  const onLogoutClick = async () => {
    deleteCookie("authToken");
    await queryCLient.invalidateQueries(userLoggedInQuery);
    router.refresh();
  };

  if (isLoggedIn == undefined) {
    return <div className="h-10" />;
  }

  return (
    <div className="flex flex-1 items-center justify-end gap-x-2">
      <Button asChild className="rounded-full" size="icon">
        <Link locale={locale === "en" ? "ar" : "en"} href={pathname}>
          {locale === "en" ? "ع" : "EN"}
        </Link>
      </Button>
      {isLoggedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="rounded-full" size="icon">
              <UserIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/profile">
                  <UserIcon />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard">
                  <LayoutDashboardIcon />
                  <span>Dashboard</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <button className="w-full" onClick={onLogoutClick} type="button">
                <LogOutIcon />
                <span>Log out</span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button asChild className="rounded-full">
          <Link href="/login-register">Login/Signup</Link>
        </Button>
      )}
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      name: t("landlord"),
      path: "/landlord",
    },
    {
      name: t("tenant"),
      path: "/tenant",
    },
    {
      name: t("services"),
      path: "/services",
      subRoutes: [
        {
          name: t("listing"),
          path: "/units",
        },
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
  ];

  return (
    <header className="fixed top-0 z-10 w-full bg-white/80 shadow-sm backdrop-blur-md">
      <Container
        as="nav"
        aria-label="Global"
        className="flex items-center justify-between gap-x-6 py-4"
      >
        <div className="flex items-center gap-x-12">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Rentak</span>

            <Image
              src={logo}
              className="h-8 w-auto object-contain"
              alt=""
              height={32}
              priority
            />
          </Link>

          <PopoverGroup className="hidden lg:flex lg:gap-x-12 xl:ms-12">
            {routes.map((route) =>
              route.subRoutes ? (
                <Popover className="relative" key={route.name}>
                  <PopoverButton className="focus:outline-hidden focus-visible:outline-primary-600 flex items-center gap-x-1 text-lg/6 font-medium text-slate-700">
                    {route.name}
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="size-5 flex-none text-slate-400"
                    />
                  </PopoverButton>

                  <PopoverPanel
                    transition
                    className="data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-leave:duration-150 data-enter:ease-out data-leave:ease-in absolute -left-8 top-full z-20 mt-3 w-56 rounded-xl bg-white p-2 shadow-lg ring-1 ring-slate-900/5 transition"
                  >
                    {route.subRoutes.map((item) => (
                      <a
                        key={item.name}
                        href={item.path}
                        className={cn(
                          "block rounded-lg px-3 py-2 text-base/6 hover:bg-slate-50",
                          pathname === item.path
                            ? "font-semibold text-slate-900"
                            : "font-medium text-slate-700",
                          item.disabled
                            && "disabled text-slate-400! pointer-events-none",
                        )}
                      >
                        {item.name}
                      </a>
                    ))}
                  </PopoverPanel>
                </Popover>
              ) : (
                <Link
                  key={route.name}
                  href={route.path}
                  className={cn(
                    "text-lg/6",
                    pathname === route.path
                      ? "font-semibold text-slate-900"
                      : "font-medium text-slate-700",
                  )}
                >
                  {route.name}
                </Link>
              ),
            )}
          </PopoverGroup>
        </div>

        <NavRight />

        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(true);
            }}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-slate-700"
          >
            <span className="sr-only">Open main menu</span>
            <MenuIcon aria-hidden="true" className="size-6" />
          </button>
        </div>
      </Container>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-20" />
        <DialogPanel className="fixed inset-y-0 right-0 z-20 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-slate-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Rentak</span>

              <Image
                src={logo}
                className="h-8 w-auto object-contain"
                alt=""
                height={32}
                priority
              />
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
              }}
              className="-m-2.5 rounded-md p-2.5 text-slate-700"
            >
              <span className="sr-only">Close menu</span>
              <XIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-slate-500/10">
              <div className="space-y-2 py-6">
                {routes.map((route) =>
                  route.subRoutes ? (
                    <Disclosure as="div" className="-mx-3" key={route.name}>
                      <DisclosureButton className="focus:outline-hidden group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-medium text-slate-700 hover:bg-slate-50">
                        {route.name}
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="group-data-open:rotate-180 size-5 flex-none"
                        />
                      </DisclosureButton>
                      <DisclosurePanel className="mt-2 space-y-2">
                        {route.subRoutes.map((item) => (
                          <DisclosureButton
                            key={item.name}
                            as={Link}
                            href={item.path}
                            onClick={() => {
                              setMobileMenuOpen(false);
                            }}
                            className={cn(
                              "block rounded-lg py-2 pl-6 pr-3 text-sm/7 hover:bg-slate-50",
                              pathname === item.path
                                ? "font-semibold text-slate-900"
                                : "font-medium text-slate-700",
                              item.disabled
                                && "disabled text-slate-400! pointer-events-none",
                            )}
                          >
                            {item.name}
                          </DisclosureButton>
                        ))}
                      </DisclosurePanel>
                    </Disclosure>
                  ) : (
                    <Link
                      key={route.name}
                      href={route.path}
                      onClick={() => {
                        setMobileMenuOpen(false);
                      }}
                      className={cn(
                        "-mx-3 block rounded-lg px-3 py-2 text-base/7 hover:bg-slate-50",
                        pathname === route.path
                          ? "font-semibold text-slate-900"
                          : "font-medium text-slate-700",
                      )}
                    >
                      {route.name}
                    </Link>
                  ),
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
