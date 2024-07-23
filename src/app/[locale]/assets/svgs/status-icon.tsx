function StatusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="12" fill="url(#paint0_linear_2364_4589)" />
      <defs>
        <linearGradient
          id="paint0_linear_2364_4589"
          x1="12"
          y1="0"
          x2="12"
          y2="24"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#16A34A" />
          <stop offset="1" stopColor="#16A34A" stopOpacity="0.7" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default StatusIcon;
