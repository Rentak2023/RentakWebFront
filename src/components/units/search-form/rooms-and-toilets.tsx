import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import Select from "react-select";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const RoomsAndToilets = () => {
  const t = useTranslations("units");

  const form = useFormContext();

  const roomOptions = [
    { label: 1, value: "1" },
    { label: 2, value: "2" },
    { label: 3, value: "3" },
    { label: 4, value: "4" },
  ];

  const bathroomOptions = [
    { label: 1, value: "1" },
    { label: 2, value: "2" },
    { label: 3, value: "3" },
  ];

  return (
    <>
      <div>
        <p className="mb-5 font-semibold text-[#777777]">{t("countUnit")}</p>

        <div className="filter-search-form relative mt-2">
          <FormField
            control={form.control}
            name="room_numers"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-row items-center">
                    <Select
                      {...field}
                      isClearable
                      classNamePrefix="react-select"
                      placeholder={t("selectRooms")}
                      className="form-input filter-input-box border-0"
                      options={roomOptions}
                      value={roomOptions.find(
                        (option) => option.value === field.value,
                      )}
                      onChange={(option) => {
                        field.onChange(option?.value);
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      <div>
        <div className="relative mt-2">
          <FormField
            control={form.control}
            name="bathroom_numbers"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-row items-center">
                    <Select
                      {...field}
                      isClearable
                      classNamePrefix="react-select"
                      placeholder={t("selectToilets")}
                      className="form-input filter-input-box border-0"
                      options={bathroomOptions}
                      value={bathroomOptions.find(
                        (option) => option.value === field.value,
                      )}
                      onChange={(option) => {
                        field.onChange(option?.value);
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </>
  );
};

export default RoomsAndToilets;
