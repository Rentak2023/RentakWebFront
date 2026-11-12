"use client";

import { useTranslations } from "next-intl";
import { Dialog as DialogPrimitive } from "radix-ui";
import { useRef, useState } from "react";

import { cn } from "@/lib/utils";

function EgyptFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 16" className={className} aria-hidden="true">
      <rect width="24" height="5.4" fill="#ce1126" />
      <rect y="5.3" width="24" height="5.4" fill="#fff" />
      <rect y="10.6" width="24" height="5.4" fill="#000" />
      <rect x="10" y="6.7" width="4" height="2.7" rx=".6" fill="#c8a048" />
      <rect
        x=".5"
        y=".5"
        width="23"
        height="15"
        rx="1"
        fill="none"
        stroke="rgba(15,23,43,.2)"
      />
    </svg>
  );
}

function UaeFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 16" className={className} aria-hidden="true">
      <rect x="6" width="18" height="5.4" fill="#00732f" />
      <rect x="6" y="5.3" width="18" height="5.4" fill="#fff" />
      <rect x="6" y="10.6" width="18" height="5.4" fill="#000" />
      <rect width="6" height="16" fill="#f00" />
      <rect
        x=".5"
        y=".5"
        width="23"
        height="15"
        rx="1"
        fill="none"
        stroke="rgba(15,23,43,.2)"
      />
    </svg>
  );
}

export default function CountrySwitcher() {
  const t = useTranslations("navbar");
  const [isOpen, setIsOpen] = useState(false);
  const [activeCountry, setActiveCountry] = useState<"AE" | "EG">("AE");
  const firstOptionRef = useRef<HTMLAnchorElement>(null);

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setActiveCountry("AE");
    }
    setIsOpen(open);
  };

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={handleOpenChange}>
      <DialogPrimitive.Trigger asChild>
        <button
          type="button"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-label={t("countryLabel")}
          className="inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-slate-300 bg-white transition-colors hover:bg-slate-100/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#003366]"
        >
          <EgyptFlag className="block h-4 w-6" />
        </button>
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-[#0f172b]/50 backdrop-blur-[1px] duration-150" />
        <DialogPrimitive.Content
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            firstOptionRef.current?.focus();
          }}
          className="data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-[24px] bg-white p-6 shadow-2xl outline-none duration-200"
        >
          <div className="flex items-center justify-between gap-4">
            <DialogPrimitive.Title className="text-[18px] font-semibold leading-7 text-[#001a33]">
              {t("countryTitle")}
            </DialogPrimitive.Title>
            <DialogPrimitive.Close
              className="inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#003366]"
              aria-label={t("close")}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
              <span className="sr-only">{t("close")}</span>
            </DialogPrimitive.Close>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <a
              ref={firstOptionRef}
              href="https://rentak.ae"
              onMouseEnter={() => {
                setActiveCountry("AE");
              }}
              onFocus={() => {
                setActiveCountry("AE");
              }}
              className={cn(
                "group flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-3.5 text-start text-[16px] font-medium text-slate-800 transition-all",
                activeCountry === "AE"
                  ? "bg-[rgba(3,51,102,0.04)] outline-2 outline-offset-2 outline-[rgba(0,51,102,0.9)]"
                  : "outline-2 outline-transparent hover:bg-[rgba(3,51,102,0.04)]",
              )}
            >
              <UaeFlag className="h-[20px] w-[30px] shrink-0" />
              <span>{t("countryAe")}</span>
            </a>

            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
              }}
              onMouseEnter={() => {
                setActiveCountry("EG");
              }}
              onFocus={() => {
                setActiveCountry("EG");
              }}
              className={cn(
                "group flex w-full cursor-pointer items-center gap-3 rounded-2xl px-4 py-3.5 text-start text-[16px] font-medium text-slate-800 transition-all",
                activeCountry === "EG"
                  ? "bg-[rgba(3,51,102,0.04)] outline-2 outline-offset-2 outline-[rgba(0,51,102,0.9)]"
                  : "outline-2 outline-transparent hover:bg-[rgba(3,51,102,0.04)]",
              )}
            >
              <EgyptFlag className="h-[20px] w-[30px] shrink-0" />
              <span>{t("countryEg")}</span>
            </button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
