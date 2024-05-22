import type { SvgsTypes } from "./types";

const MailOutlineIcon = ({ size, color }: SvgsTypes) => {
  return (
    <svg
      width={size ?? "20"}
      height={size ?? "21"}
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1990_3004)">
        <path
          d="M16.6665 3.83325H3.33317C2.4165 3.83325 1.67484 4.58325 1.67484 5.49992L1.6665 15.4999C1.6665 16.4166 2.4165 17.1666 3.33317 17.1666H16.6665C17.5832 17.1666 18.3332 16.4166 18.3332 15.4999V5.49992C18.3332 4.58325 17.5832 3.83325 16.6665 3.83325ZM15.8332 15.4999H4.1665C3.70817 15.4999 3.33317 15.1249 3.33317 14.6666V7.16658L9.1165 10.7833C9.65817 11.1249 10.3415 11.1249 10.8832 10.7833L16.6665 7.16658V14.6666C16.6665 15.1249 16.2915 15.4999 15.8332 15.4999ZM9.99984 9.66658L3.33317 5.49992H16.6665L9.99984 9.66658Z"
          fill={color ?? "#737373"}
        />
      </g>
      <defs>
        <clipPath id="clip0_1990_3004">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default MailOutlineIcon;
