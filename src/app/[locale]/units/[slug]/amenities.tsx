import { useTranslations } from "next-intl";
import {
  Sofa,
  Shirt,
  Car,
  Waves,
  Sparkles,
  Building2,
  Wind,
  BookOpen,
  ShieldCheck,
  Dumbbell,
  CheckCircle2,
} from "lucide-react";

type Attribute = {
  id: number;
  attribute_id: number;
  attribute_name: string;
};

type AmenitiesProps = {
  attributes?: Attribute[];
};

const iconMap: Record<string, React.ReactNode> = {
  furnished: <Sofa className="size-5" />,
  wardrobe: <Shirt className="size-5" />,
  parking: <Car className="size-5" />,
  water: <Waves className="size-5" />,
  spa: <Sparkles className="size-5" />,
  balcony: <Building2 className="size-5" />,
  "air conditioning": <Wind className="size-5" />,
  "a/c": <Wind className="size-5" />,
  study: <BookOpen className="size-5" />,
  security: <ShieldCheck className="size-5" />,
  gym: <Dumbbell className="size-5" />,
};

function getIcon(name: string): React.ReactNode {
  const lowerName = name.toLowerCase();
  for (const [key, icon] of Object.entries(iconMap)) {
    if (lowerName.includes(key)) return icon;
  }
  return <CheckCircle2 className="size-5" />;
}

function Amenities({ attributes }: AmenitiesProps) {
  const t = useTranslations("units");

  if (!attributes || attributes.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold text-slate-800 mb-6">
        {t("amenities")}
      </h3>
      <ul className="grid grid-cols-1 gap-x-12 gap-y-4 sm:grid-cols-2">
        {attributes.map((attr) => (
          <li
            key={attr.id}
            className="flex items-center gap-3 text-primary-700 group"
          >
            <span className="flex items-center justify-center size-9 rounded-lg bg-primary-50 text-primary-700 group-hover:bg-primary-100 transition-colors duration-200">
              {getIcon(attr.attribute_name)}
            </span>
            <span className="text-base font-medium text-slate-700">
              {attr.attribute_name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Amenities;
