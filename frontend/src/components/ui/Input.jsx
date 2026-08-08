import { forwardRef } from "react";

const Input = forwardRef(
  ({
    label,
    error,
    hint,
    leftIcon,
    rightIcon,
    className = "",
    id,
    ...props
  }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-white/80 text-sm font-medium mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/50">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`
              w-full bg-white/10 text-white placeholder-white/60 border border-white/30 rounded-xl
              outline-none transition-all duration-200
              focus:ring-2 focus:ring-purple-500 focus:border-transparent
              disabled:bg-white/5 disabled:text-white/50 disabled:cursor-not-allowed
              ${leftIcon ? "pl-12" : "pl-4"}
              ${rightIcon ? "pr-12" : "pr-4"}
              py-3 text-base
              ${error ? "border-red-500 focus:ring-red-500" : ""}
              ${className}
            `}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-white/50">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-1.5 text-sm text-red-300 flex items-center gap-1"
            role="alert"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="mt-1.5 text-sm text-white/50">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;