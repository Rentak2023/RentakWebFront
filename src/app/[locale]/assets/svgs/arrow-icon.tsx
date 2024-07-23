import { cn } from "@/lib/utils";

type ArrowIconProps = React.SVGProps<SVGSVGElement> & {
  type: "left" | "right";
};

function ArrowIcon({ type, className, ...props }: ArrowIconProps) {
  switch (type) {
    case "right": {
      return (
        <svg
          width="14"
          height="15"
          viewBox="0 0 14 15"
          fill="none"
          className={cn("rtl:rotate-180", className)}
          {...props}
        >
          <path
            d="M9.16016 11.8362C9.03255 11.7268 8.96875 11.581 8.96875 11.3987C8.96875 11.2164 9.03255 11.0615 9.16016 10.9338L11.7578 8.33619H0.65625C0.255208 8.29973 0.0364583 8.07187 0 7.6526C0.0364583 7.26978 0.255208 7.06015 0.65625 7.02369H11.7578L9.16016 4.42603C8.90495 4.11614 8.90495 3.80624 9.16016 3.49635C9.47005 3.24114 9.77995 3.24114 10.0898 3.49635L13.8086 7.2151C14.0638 7.52499 14.0638 7.83489 13.8086 8.14478L10.0898 11.8635C9.77995 12.1187 9.47005 12.1096 9.16016 11.8362Z"
            fill="currentColor"
          />
        </svg>
      );
    }
    case "left": {
      return (
        <svg
          width="14"
          height="15"
          viewBox="0 0 14 15"
          fill="none"
          className={cn("rtl:rotate-180", className)}
        >
          <g clipPath="url(#clip0_1990_2631)">
            <path
              d="M4.8125 3.49658C4.95833 3.62419 5.03125 3.77913 5.03125 3.96143C5.03125 4.14372 4.95833 4.28955 4.8125 4.39893L2.24219 7.02393H13.3438C13.7448 7.06038 13.9635 7.27913 14 7.68018C13.9635 8.08122 13.7448 8.29997 13.3438 8.33643H2.24219L4.83984 10.9341C5.09505 11.244 5.09505 11.5539 4.83984 11.8638C4.52995 12.119 4.22005 12.119 3.91016 11.8638L0.191406 8.14502C-0.0638021 7.83512 -0.0638021 7.52523 0.191406 7.21533L3.91016 3.49658C4.22005 3.24137 4.52083 3.24137 4.8125 3.49658Z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="clip0_1990_2631">
              <rect
                width="14"
                height="14"
                fill="white"
                transform="matrix(1 0 0 -1 0 14.6802)"
              />
            </clipPath>
          </defs>
        </svg>
      );
    }
  }
}

export default ArrowIcon;
