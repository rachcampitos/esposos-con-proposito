interface Props {
  color?: string;
  flip?: boolean;
  className?: string;
}

export function WaveDivider({ color = "#F5F0EB", flip = false, className = "" }: Props) {
  return (
    <div
      className={`wave-divider ${className}`}
      style={{ transform: flip ? "rotate(180deg)" : undefined }}
    >
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
