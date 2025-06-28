import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={
          "rounded-2xl border border-[#24396C]/20 bg-white p-4 shadow-sm " + className
        }
        {...props}
      />
    );
  }
);

Card.displayName = "Card";
