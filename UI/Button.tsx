import {
  ButtonHTMLAttributes,
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";
import { VariantProps, cva } from "class-variance-authority";
import Link from "next/link";
import { cn } from "./util";

const buttonVariants = cva("", {
  variants: {
    variant: {
      default:
        " bg-white transition-all duration-150  rounded-md border-2 border-gray-500 hover:border-gray-400 cursor-pointer z-10 hover:bg-black hover:text-white dark:bg-black dark:border-[#474E68] hover:scale-105",
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
type ButtonType = ForwardRefExoticComponent<
  ButtonInterface & RefAttributes<HTMLButtonElement>
>;

const Button: ButtonType = forwardRef<HTMLButtonElement, ButtonInterface>(
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
