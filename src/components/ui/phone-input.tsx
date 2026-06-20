"use client";

import { ChevronDown, Search } from "lucide-react";
import { useLocale } from "next-intl";
import * as React from "react";

import { cn } from "@/lib/utils";

import { Input } from "./input";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

type Country = {
  name: string;
  nameAr: string;
  code: string;
  dialCode: string;
  flag: string;
}

const countries: Array<Country> = [
  { name: "Egypt", nameAr: "مصر", code: "EG", dialCode: "+20", flag: "🇪🇬" },
  { name: "Saudi Arabia", nameAr: "المملكة العربية السعودية", code: "SA", dialCode: "+966", flag: "🇸🇦" },
  { name: "United Arab Emirates", nameAr: "الإمارات العربية المتحدة", code: "AE", dialCode: "+971", flag: "🇦🇪" },
  { name: "Kuwait", nameAr: "الكويت", code: "KW", dialCode: "+965", flag: "🇰🇼" },
  { name: "Qatar", nameAr: "قطر", code: "QA", dialCode: "+974", flag: "🇶🇦" },
  { name: "Oman", nameAr: "عمان", code: "OM", dialCode: "+968", flag: "🇴🇲" },
  { name: "Bahrain", nameAr: "البحرين", code: "BH", dialCode: "+973", flag: "🇧🇭" },
  { name: "Jordan", nameAr: "الأردن", code: "JO", dialCode: "+962", flag: "🇯🇴" },
  { name: "Iraq", nameAr: "العراق", code: "IQ", dialCode: "+964", flag: "🇮🇶" },
  { name: "Yemen", nameAr: "اليمن", code: "YE", dialCode: "+967", flag: "🇾🇪" },
  { name: "Syria", nameAr: "سوريا", code: "SY", dialCode: "+963", flag: "🇸🇾" },
  { name: "Lebanon", nameAr: "لبنان", code: "LB", dialCode: "+961", flag: "🇱🇧" },
  { name: "Palestine", nameAr: "فلسطين", code: "PS", dialCode: "+970", flag: "🇵🇸" },
  { name: "Sudan", nameAr: "السودان", code: "SD", dialCode: "+249", flag: "🇸🇩" },
  { name: "Libya", nameAr: "ليبيا", code: "LY", dialCode: "+218", flag: "🇱🇾" },
  { name: "Tunisia", nameAr: "تونس", code: "TN", dialCode: "+216", flag: "🇹🇳" },
  { name: "Algeria", nameAr: "الجزائر", code: "DZ", dialCode: "+213", flag: "🇩🇿" },
  { name: "Morocco", nameAr: "المغرب", code: "MA", dialCode: "+212", flag: "🇲🇦" },
  { name: "United States", nameAr: "الولايات المتحدة", code: "US", dialCode: "+1", flag: "🇺🇸" },
  { name: "United Kingdom", nameAr: "المملكة المتحدة", code: "GB", dialCode: "+44", flag: "🇬🇧" },
  { name: "Canada", nameAr: "كندا", code: "CA", dialCode: "+1", flag: "🇨🇦" },
  { name: "Germany", nameAr: "ألمانيا", code: "DE", dialCode: "+49", flag: "🇩🇪" },
  { name: "France", nameAr: "فرنسا", code: "FR", dialCode: "+33", flag: "🇫🇷" },
  { name: "Italy", nameAr: "إيطاليا", code: "IT", dialCode: "+39", flag: "🇮🇹" },
  { name: "Spain", nameAr: "إسبانيا", code: "ES", dialCode: "+34", flag: "🇪🇸" },
  { name: "Turkey", nameAr: "تركيا", code: "TR", dialCode: "+90", flag: "🇹🇷" },
  { name: "India", nameAr: "الهند", code: "IN", dialCode: "+91", flag: "🇮🇳" },
  { name: "China", nameAr: "الصين", code: "CN", dialCode: "+86", flag: "🇨🇳" },
  { name: "Russia", nameAr: "روسيا", code: "RU", dialCode: "+7", flag: "🇷🇺" },
  { name: "Brazil", nameAr: "البرازيل", code: "BR", dialCode: "+55", flag: "🇧🇷" },
  { name: "Australia", nameAr: "أستراليا", code: "AU", dialCode: "+61", flag: "🇦🇺" },
  { name: "Pakistan", nameAr: "باكستان", code: "PK", dialCode: "+92", flag: "🇵🇰" },
  { name: "Bangladesh", nameAr: "بنجلاديش", code: "BD", dialCode: "+880", flag: "🇧🇩" },
  { name: "Nigeria", nameAr: "نيجيريا", code: "NG", dialCode: "+234", flag: "🇳🇬" },
  { name: "South Africa", nameAr: "جنوب أفريقيا", code: "ZA", dialCode: "+27", flag: "🇿🇦" },
  { name: "Japan", nameAr: "اليابان", code: "JP", dialCode: "+81", flag: "🇯🇵" },
  { name: "South Korea", nameAr: "كوريا الجنوبية", code: "KR", dialCode: "+82", flag: "🇰🇷" },
  { name: "Indonesia", nameAr: "إندونيسيا", code: "ID", dialCode: "+62", flag: "🇮🇩" },
  { name: "Malaysia", nameAr: "ماليزيا", code: "MY", dialCode: "+60", flag: "🇲🇾" },
  { name: "Singapore", nameAr: "سنغافورة", code: "SG", dialCode: "+65", flag: "🇸🇬" },
  { name: "Netherlands", nameAr: "هولندا", code: "NL", dialCode: "+31", flag: "🇳🇱" },
  { name: "Belgium", nameAr: "بلجيكا", code: "BE", dialCode: "+32", flag: "🇧🇪" },
  { name: "Switzerland", nameAr: "سويسرا", code: "CH", dialCode: "+41", flag: "🇨🇭" },
  { name: "Sweden", nameAr: "السويد", code: "SE", dialCode: "+46", flag: "🇸🇪" },
  { name: "Norway", nameAr: "النرويج", code: "NO", dialCode: "+47", flag: "🇳🇴" },
  { name: "Denmark", nameAr: "الدنمارك", code: "DK", dialCode: "+45", flag: "🇩🇰" },
  { name: "Finland", nameAr: "فنلندا", code: "FI", dialCode: "+358", flag: "🇫🇮" },
  { name: "Ireland", nameAr: "أيرلندا", code: "IE", dialCode: "+353", flag: "🇮🇪" },
  { name: "Greece", nameAr: "اليونان", code: "GR", dialCode: "+30", flag: "🇬🇷" },
  { name: "Portugal", nameAr: "البرتغال", code: "PT", dialCode: "+351", flag: "🇵🇹" },
  { name: "Austria", nameAr: "النمسا", code: "AT", dialCode: "+43", flag: "🇦🇹" },
  { name: "Ukraine", nameAr: "أوكرانيا", code: "UA", dialCode: "+380", flag: "🇺🇦" },
];

const sortedCountries = [...countries].sort(
  (a, b) => b.dialCode.length - a.dialCode.length,
);

export type PhoneInputProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

export const PhoneInput = ({ ref, value, onChange, className, disabled: disabledProp }: PhoneInputProps & { ref?: React.RefObject<HTMLInputElement | null> }) => {
    const locale = useLocale();
    const [open, setOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");

    // Identify the selected country based on the current value string prefix
    const selectedCountry = React.useMemo(() => {
      if (!value) return null;
      return sortedCountries.find((c) => value.startsWith(c.dialCode)) ?? null;
    }, [value]);

    // Extract the national number (the part after the country dial code)
    const nationalNumber = React.useMemo(() => {
      if (!selectedCountry) return value;
      return value.slice(selectedCountry.dialCode.length);
    }, [value, selectedCountry]);

    const filteredCountries = React.useMemo(() => {
      return countries.filter((c) => {
        const query = searchQuery.toLowerCase();
        return (
          c.name.toLowerCase().includes(query) ||
          c.nameAr.toLowerCase().includes(query) ||
          c.dialCode.includes(query) ||
          c.code.toLowerCase().includes(query)
        );
      });
    }, [searchQuery]);

    const handleCountrySelect = (country: Country) => {
      setOpen(false);
      setSearchQuery("");
      // Keep existing national number, swap out the dial code
      onChange(country.dialCode + nationalNumber);
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const cleanVal = e.target.value.replaceAll(/[^\d]/g, "");
      if (selectedCountry) {
        onChange(selectedCountry.dialCode + cleanVal);
      }
    };

    const selectCodeText = locale === "ar" ? "رمز البلد" : "Code";
    const searchCountryText = locale === "ar" ? "ابحث عن بلد..." : "Search country...";
    const placeholderText = selectedCountry
      ? (locale === "ar" ? "أدخل رقم الهاتف" : "Enter phone number")
      : (locale === "ar" ? "اختر رمز البلد أولاً" : "Select country code first");

    return (
      <div
        className={cn(
          "flex items-center rounded-md border border-slate-200 bg-white focus-within:ring-2 focus-within:ring-slate-950 focus-within:ring-offset-2 divide-x divide-slate-200 rtl:divide-x-reverse h-10 overflow-hidden",
          disabledProp && "opacity-50 pointer-events-none",
          className,
        )}
      >
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              disabled={disabledProp}
              className="flex items-center gap-1.5 px-3 h-full hover:bg-slate-50 transition-colors shrink-0 text-sm font-medium text-slate-600 focus:outline-none"
            >
              {selectedCountry ? (
                <>
                  <img
                    src={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png`}
                    alt={selectedCountry.name}
                    className="w-5 h-3.5 object-cover rounded-sm shrink-0 border border-slate-100"
                  />
                  <span className="font-mono text-slate-800 dir-ltr inline-block">
                    {selectedCountry.dialCode}
                  </span>
                </>
              ) : (
                <span className="text-slate-400 font-normal">{selectCodeText}</span>
              )}
              <ChevronDown className="size-3.5 opacity-50 shrink-0" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0" align="start">
            <div className="flex items-center border-b px-3 h-10">
              <Search className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4 shrink-0 opacity-50" />
              <input
                placeholder={searchCountryText}
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); }}
                className="flex h-9 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div className="max-h-64 overflow-y-auto p-1 divide-y divide-slate-50">
              {filteredCountries.length === 0 ? (
                <div className="py-6 text-center text-sm text-slate-500">
                  {locale === "ar" ? "لم يتم العثور على نتائج." : "No results found."}
                </div>
              ) : (
                filteredCountries.map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    className="flex items-center justify-between w-full text-left rtl:text-right px-2.5 py-2.5 rounded-md hover:bg-slate-100 text-sm transition-colors focus:outline-none focus:bg-slate-100"
                    onClick={() => { handleCountrySelect(country); }}
                  >
                    <span className="flex items-center gap-2">
                      <img
                        src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                        alt={country.name}
                        className="w-5 h-3.5 object-cover rounded-sm shrink-0 border border-slate-100"
                      />
                      <span className="font-medium text-slate-800 truncate max-w-[170px]">
                        {locale === "ar" ? country.nameAr : country.name}
                      </span>
                    </span>
                    <span className="text-slate-500 font-mono text-xs pr-1">
                      {country.dialCode}
                    </span>
                  </button>
                ))
              )}
            </div>
          </PopoverContent>
        </Popover>

        <Input
          ref={ref}
          type="tel"
          disabled={!selectedCountry || disabledProp}
          placeholder={placeholderText}
          value={nationalNumber}
          onChange={handlePhoneChange}
          className="border-0 bg-transparent h-full px-3 focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:bg-slate-50/50"
        />
      </div>
    );
  };

PhoneInput.displayName = "PhoneInput";
