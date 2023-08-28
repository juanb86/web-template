import { type ElementType, type HTMLAttributes } from "react";
import { useInView } from "react-intersection-observer";

interface Props extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
}

const AnimatedInView: React.FC<Props> = ({
  as: Tag = "div",
  className: classNameProp = "",
  children,
  ...rest
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "-50px 0px",
  });

  return (
    <Tag
      ref={ref}
      className={`${classNameProp} [transition:transform_1s,opacity_2s] ${
        inView ? "opacity-1 translate-x-0" : "translate-x-full opacity-0"
      }`}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default AnimatedInView;
