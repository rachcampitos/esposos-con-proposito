interface Props {
  /** Color of the section above */
  from: string;
  /** Color of the section below */
  to: string;
  flip?: boolean;
  className?: string;
}

export function WaveDivider({ from, to, flip = false, className = "" }: Props) {
  const bgColor = flip ? to : from;
  const fillColor = flip ? from : to;

  return (
    <div
      className={`relative z-10 ${className}`}
      style={{ background: bgColor, marginTop: -1, marginBottom: -1 }}
    >
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="block w-full"
        style={{
          height: "clamp(40px, 5vw, 80px)",
          transform: flip ? "scaleY(-1)" : undefined,
        }}
      >
        {/* Fill the top half with bgColor to eliminate any gap */}
        <rect x="0" y="0" width="1440" height="40" fill={bgColor} />
        <path
          d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
}
