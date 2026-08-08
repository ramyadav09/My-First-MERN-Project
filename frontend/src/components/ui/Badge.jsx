const Badge = ({
  children,
  variant = "default",
  size = "md",
  className = "",
  dot = false,
  dotColor,
  removable = false,
  onRemove,
  ...props
}) => {
  const variants = {
    default: "bg-white/10 text-white/80 border border-white/20",
    primary: "bg-purple-600/20 text-purple-300 border border-purple-500/30",
    success: "bg-green-500/20 text-green-300 border border-green-500/30",
    warning: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
    danger: "bg-red-500/20 text-red-300 border border-red-500/30",
    info: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
    outline: "bg-transparent text-white/70 border border-white/30",
  };

  const sizes = {
    xs: "px-2 py-0.5 text-xs gap-1",
    sm: "px-2.5 py-1 text-xs gap-1",
    md: "px-3 py-1 text-sm gap-1.5",
    lg: "px-4 py-1.5 text-base gap-2",
  };

  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-full
        ${variants[variant]} ${sizes[size]} ${className}
        ${removable ? "pr-1" : ""}
      `}
      {...props}
    >
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{
            backgroundColor:
              dotColor ||
              (variant === "success"
                ? "#22c55e"
                : variant === "warning"
                ? "#f59e0b"
                : variant === "danger"
                ? "#ef4444"
                : variant === "info"
                ? "#3b82f6"
                : variant === "primary"
                ? "#a855f7"
                : "#9ca3af"),
          }}
        />
      )}
      <span className="truncate">{children}</span>
      {removable && onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-1 p-0.5 rounded-full hover:bg-white/20 transition-colors flex items-center justify-center"
          aria-label="Remove"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </span>
  );
};

export default Badge;