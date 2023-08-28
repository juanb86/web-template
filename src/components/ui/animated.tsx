import React from "react";
import { useInView } from "react-intersection-observer";
import { cva, type VariantProps } from "class-variance-authority";
import { cn, mergeRefs } from "~/utils/front";

const animationVariants = cva("", {
  variants: {
    animation: {
      right: "translate-x-full opacity-0",
      left: "-translate-x-full opacity-0",
      top: "-translate-y-full opacity-0",
      bottom: "translate-y-full opacity-0",
      none: "translate-0 opacity-0",
    },
  },
  defaultVariants: {
    animation: "right",
  },
});

export interface AnimatedInViewProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof animationVariants> {
  as?: React.ElementType;
}

const AnimatedInView = React.forwardRef<HTMLElement, AnimatedInViewProps>(
  ({ className, animation, as: Tag = "div", ...props }, ref) => {
    const { ref: refInView, inView } = useInView({
      triggerOnce: true,
      rootMargin: "-50px 0px",
    });

    return (
      <Tag
        className={cn(
          animationVariants({ animation, className }),
          "[transition:transform_1s,opacity_2s]",
          inView ? "opacity-1 translate-x-0 translate-y-0" : ""
        )}
        ref={mergeRefs(ref, refInView)}
        {...props}
      />
    );
  }
);
AnimatedInView.displayName = "AnimatedInView";

export { AnimatedInView, animationVariants };

export default AnimatedInView;
