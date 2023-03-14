import { ButtonHTMLAttributes, forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import Link from "next/link";
import { cn } from "./util";

const buttonVariants = cva("", {
  variants: {
    variant: {
      default:
        " bg-white pl-7 -ml-7 pr-7 p-2 transition-all duration-150  rounded-xl border-2 border-gray-500 hover:border-gray-400 cursor-pointer z-10 hover:bg-black hover:text-white dark:bg-black dark:border-[#474E68] hover:scale-105",
      outline: "",
    },
    size: {
      default: "p-4",
      sm: "p-3",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

interface ButtonInterface
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonInterface>(
  ({ className, size, variant, children, href, ...props }) => {
    if (href) {
      return (
        <button className={cn(buttonVariants({ variant, size, className }))}>
          <Link href={href}>{children}</Link>
        </button>
      );
    }
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </button>
    );
  }
);

export { Button, buttonVariants };
