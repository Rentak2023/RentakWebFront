import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type FormValues } from "@/components/units/types";

function RoomsAndToilets() {
  const t = useTranslations("units");

  const form = useFormContext<FormValues>();

  const roomOptions = [
    { label: 1, value: 1 },
    { label: 2, value: 2 },
    { label: 3, value: 3 },
    { label: 4, value: 4 },
  ];

  const bathroomOptions = [
    { label: 1, value: 1 },
    { label: 2, value: 2 },
    { label: 3, value: 3 },
  ];

  return (
    <div>
      <p className="font-medium text-slate-600">{t("countUnit")}</p>

      <div className="mt-4">
        <FormField
          control={form.control}
          name="room_numers"
          render={({ field }) => (
            <FormItem>
              <Select
                onValueChange={(val) => {
                  field.onChange(val ? Number(val) : null);
                }}
                value={field.value ? String(field.value) : undefined}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectRooms")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {roomOptions.map((room) => (
                    <SelectItem key={room.value} value={room.value.toString()}>
                      {room.label}
                    </SelectItem>
                  ))}
                  <Button
                    className="w-full px-2"
                    variant="secondary"
                    size="sm"
                    type="button"
                    onClick={() => {
                      field.onChange(null);
                    }}
                  >
                    {t("clear")}
                  </Button>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="mt-2">
        <FormField
          control={form.control}
          name="bathroom_numbers"
          render={({ field }) => (
            <FormItem>
              <Select
                onValueChange={(val) => {
                  field.onChange(val ? Number(val) : null);
                }}
                value={field.value ? String(field.value) : undefined}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectToilets")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {bathroomOptions.map((bathroom) => (
                    <SelectItem
                      key={bathroom.value}
                      value={bathroom.value.toString()}
                    >
                      {bathroom.label}
                    </SelectItem>
                  ))}
                  <Button
                    className="w-full px-2"
                    variant="secondary"
                    size="sm"
                    type="button"
                    onClick={() => {
                      field.onChange(null);
                    }}
                  >
                    {t("clear")}
                  </Button>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

export default RoomsAndToilets;
