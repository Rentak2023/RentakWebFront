import { type SvgsTypes } from "./types";

const SeparatorIcon = ({ size, color }: SvgsTypes) => {
  return (
    <svg
      width={size ?? "100%"}
      height="2"
      viewBox="0 0 442 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        y="0.289062"
        width="442"
        height="1.5"
        rx="0.75"
        fill="#011435"
        fillOpacity="0.12"
      />
    </svg>
  );
};

export default SeparatorIcon;
