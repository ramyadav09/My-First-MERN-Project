import { forwardRef } from "react";

const Card = forwardRef(
  ({
    children,
    className = "",
    variant = "glass",
    padding = "p-6",
    hover = false,
    ...props
  }, ref) => {
    const variants = {
      glass:
        "backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl",
      solid: "bg-gray-900 border border-gray-700 shadow-xl",
      elevated: "bg-gray-800/50 border border-gray-700/50 shadow-2xl",
      outline: "bg-transparent border-2 border-white/20",
    };

    const hoverStyles = hover
      ? "transition-all duration-300 hover:shadow-[0_0_40px_rgba(139,92,246,0.3)] hover:-translate-y-1 hover:border-white/30"
      : "";

    return (
      <div
        ref={ref}
        className={`${variants[variant]} rounded-2xl ${padding} ${hoverStyles} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export const CardHeader = forwardRef(({ children, className = "", ...props }, ref) => (
  <div ref={ref} className={`mb-4 ${className}`} {...props}>
    {children}
  </div>
));

CardHeader.displayName = "CardHeader";

export const CardTitle = forwardRef(({ children, className = "", ...props }, ref) => (
  <h3 ref={ref} className={`text-xl font-bold text-white ${className}`} {...props}>
    {children}
  </h3>
));

CardTitle.displayName = "CardTitle";

export const CardDescription = forwardRef(({ children, className = "", ...props }, ref) => (
  <p ref={ref} className={`text-white/60 text-sm mt-1 ${className}`} {...props}>
    {children}
  </p>
));

CardDescription.displayName = "CardDescription";

export const CardContent = forwardRef(({ children, className = "", ...props }, ref) => (
  <div ref={ref} className={className} {...props}>
    {children}
  </div>
));

CardContent.displayName = "CardContent";

export const CardFooter = forwardRef(({ children, className = "", ...props }, ref) => (
  <div ref={ref} className={`mt-4 pt-4 border-t border-white/10 flex items-center ${className}`} {...props}>
    {children}
  </div>
));

CardFooter.displayName = "CardFooter";

export default Card;