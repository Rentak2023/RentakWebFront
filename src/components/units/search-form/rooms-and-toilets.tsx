import { useTranslations } from "next-intl";
import { type Control } from "react-hook-form";
import Select from "react-select";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const RoomsAndToilets = ({
  control,
  onChange,
}: {
  control: Control;
  onChange: (name: string, value: string) => void;
}) => {
  const t = useTranslations("units");

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
            control={control}
            name="room_numers"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-row items-center">
                    <Select
                      isClearable
                      classNamePrefix="react-select"
                      placeholder={t("selectRooms")}
                      className="form-input filter-input-box border-0"
                      options={roomOptions}
                      {...field}
                      value={roomOptions.find(
                        (option) => option.value === field.value,
                      )}
                      onChange={(option) => {
                        field.onChange(option?.value);
                        onChange("room_numers", String(option?.value));
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
            control={control}
            name="bathroom_numbers"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-row items-center">
                    <Select
                      isClearable
                      classNamePrefix="react-select"
                      placeholder={t("selectToilets")}
                      className="form-input filter-input-box border-0"
                      options={bathroomOptions}
                      {...field}
                      value={bathroomOptions.find(
                        (option) => option.value === field.value,
                      )}
                      onChange={(option) => {
                        field.onChange(option?.value);
                        onChange("bathroom_numbers", String(option?.value));
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
