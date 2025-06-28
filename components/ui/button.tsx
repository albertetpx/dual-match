import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", ...props }, ref) => {
    const base =
      "inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
    const variants = {
      default: "bg-[#CCDB42] text-[#24396C] hover:bg-[#b6c622]",
      outline: "border border-[#24396C] text-[#24396C] bg-white hover:bg-[#f0f0f0]",
    };

    return (
      <button
        ref={ref}
        className={[base, variants[variant], className].join(" ")}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";