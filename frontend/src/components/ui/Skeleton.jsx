const Skeleton = ({
  className = "",
  variant = "text",
  width = "100%",
  height,
  count = 1,
  ...props
}) => {
  const baseStyles = "animate-pulse bg-gradient-to-r from-white/10 via-white/20 to-white/10 bg-[length:200%_100%] rounded";

  const variants = {
    text: "h-4",
    title: "h-6 w-3/4",
    caption: "h-3 w-1/2",
    avatar: "rounded-full",
    card: "rounded-xl",
    button: "h-10 rounded-xl",
    input: "h-10 rounded-xl",
    image: "rounded-xl",
    circular: "rounded-full",
  };

  const getHeight = () => {
    if (height) return height;
    switch (variant) {
      case "avatar":
        return "w-10 h-10";
      case "button":
        return "h-10";
      case "input":
        return "h-10";
      case "image":
        return "h-48";
      default:
        return variants[variant] || "h-4";
    }
  };

  const items = Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      style={{ width, height: getHeight() }}
      {...props}
    />
  ));

  return <div className="space-y-3">{items}</div>;
};

export const SkeletonCard = ({ className = "" }) => (
  <div className={`animate-pulse ${className}`}>
    <div className="aspect-video bg-gradient-to-r from-white/10 via-white/20 to-white/10 bg-[length:200%_100%] rounded-xl mb-4" />
    <div className="space-y-3">
      <div className="h-6 w-1/2 bg-gradient-to-r from-white/10 via-white/20 to-white/10 bg-[length:200%_100%] rounded" />
      <div className="h-4 w-3/4 bg-gradient-to-r from-white/10 via-white/20 to-white/10 bg-[length:200%_100%] rounded" />
      <div className="h-4 w-1/2 bg-gradient-to-r from-white/10 via-white/20 to-white/10 bg-[length:200%_100%] rounded" />
      <div className="flex gap-2 mt-4">
        <div className="h-6 w-20 bg-gradient-to-r from-white/10 via-white/20 to-white/10 bg-[length:200%_100%] rounded-full" />
        <div className="h-6 w-20 bg-gradient-to-r from-white/10 via-white/20 to-white/10 bg-[length:200%_100%] rounded-full" />
      </div>
    </div>
  </div>
);

export const SkeletonList = ({ count = 5, className = "" }) => (
  <div className={`space-y-4 ${className}`}>
    {Array.from({ length: count }, (_, i) => (
      <div key={i} className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-white/10 via-white/20 to-white/10 bg-[length:200%_100%]" />
        <div className="flex-1 space-y-2">
          <div className="h-5 w-1/3 bg-gradient-to-r from-white/10 via-white/20 to-white/10 bg-[length:200%_100%] rounded" />
          <div className="h-4 w-1/2 bg-gradient-to-r from-white/10 via-white/20 to-white/10 bg-[length:200%_100%] rounded" />
        </div>
      </div>
    ))}
  </div>
);

export default Skeleton;