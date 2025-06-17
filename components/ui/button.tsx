import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center !text-[#6B6B6B] hover:bg-neutral-50 justify-center whitespace-nowrap !rounded-[8px] text-[14px] leading-[24px] font-[400]  transition-colors focus-visible:outline-none disabl",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground ",
        destructive: "bg-destructive text-destructive-foreground ",
        outline: "border border-input bg-background",
        secondary: "bg-secondary text-secondary-foreground ",
        ghost: "",
        link: "text-primary underline-offset-4 hover:underline",
        light: "bg-[#EBE6FF] !px-6 !py-3 !text-[#350abc] hover:bg-[#FFF] !rounded-full font-[500] leading-[24px] hover:shadow-lg text-[16px] !h-[43px] transition-colors duration-200",
        purple: "bg-[#7E4DE2] aspect-square flex items-center justify-center !p-0 !text-[#FFF] hover:bg-[#7447ce] hover:shadow-lg !rounded-full !h-[43px] transition-all duration-200",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        style={{ height: "57px" }}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
