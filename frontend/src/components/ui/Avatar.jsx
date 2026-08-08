import { FaUser } from "react-icons/fa";

const Avatar = ({
  src,
  alt = "",
  name = "",
  size = "md",
  status,
  statusPosition = "bottom-right",
  className = "",
  fallbackColor,
}) => {
  const sizes = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
    xl: "w-16 h-16 text-xl",
    "2xl": "w-24 h-24 text-2xl",
    "3xl": "w-32 h-32 text-3xl",
  };

  const statusSizes = {
    xs: "w-1.5 h-1.5",
    sm: "w-2 h-2",
    md: "w-2.5 h-2.5",
    lg: "w-3 h-3",
    xl: "w-3.5 h-3.5",
    "2xl": "w-5 h-5",
    "3xl": "w-6 h-6",
  };

  const statusPositions = {
    "bottom-right": "bottom-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "top-right": "top-0 right-0",
    "top-left": "top-0 left-0",
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getFallbackColor = (name) => {
    if (fallbackColor) return fallbackColor;
    const colors = [
      "from-purple-600 to-purple-700",
      "from-blue-600 to-blue-700",
      "from-green-600 to-green-700",
      "from-yellow-500 to-yellow-600",
      "from-red-500 to-red-600",
      "from-pink-500 to-pink-600",
      "from-indigo-600 to-indigo-700",
      "from-teal-500 to-teal-600",
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const fallbackGradient = getFallbackColor(name || "User");

  return (
    <div className={`relative inline-flex ${className}`}>
      {src ? (
        <img
          src={src}
          alt={alt || name}
          className={`${sizes[size]} rounded-full object-cover ring-2 ring-white/10`}
        />
      ) : (
        <div
          className={`${sizes[size]} rounded-full bg-gradient-to-br ${fallbackGradient} flex items-center justify-center text-white font-semibold ring-2 ring-white/10`}
          aria-label={name || "User avatar"}
        >
          {name ? getInitials(name) : <FaUser className="mx-auto" />}
        </div>
      )}
      {status && (
        <span
          className={`
            absolute rounded-full border-2 border-gray-900
            ${statusSizes[size]}
            ${statusPositions[statusPosition]}
          `}
          style={{
            backgroundColor:
              status === "online"
                ? "#22c55e"
                : status === "away"
                ? "#f59e0b"
                : status === "busy"
                ? "#ef4444"
                : "#6b7280",
          }}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
};

export default Avatar;