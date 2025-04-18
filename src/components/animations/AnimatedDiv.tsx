import React, { useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

type AnimationType =
  | "fade"
  | "slide-left"
  | "slide-right"
  | "slide-top"
  | "slide-bottom";

type Props = {
  children: React.ReactNode;
  animationType?: AnimationType;
  duration?: number;
  delay?: number;
  className: string; // Allow user to pass custom classes
  style?: React.CSSProperties;
  inViewport?: boolean; // trigger animation only when in viewport
  once?: boolean; // animate only once
  margin?: any; // rootMargin for fine-tuning in-view detection
};

const getVariants = (type: AnimationType, duration: number, delay: number) => {
  const transition = { duration, delay };

  switch (type) {
    case "fade":
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition },
        exit: { opacity: 0, transition },
      };
    case "slide-left":
      return {
        hidden: { x: 100, opacity: 0 },
        visible: { x: 0, opacity: 1, transition },
        exit: { x: 100, opacity: 0, transition },
      };
    case "slide-right":
      return {
        hidden: { x: -100, opacity: 0 },
        visible: { x: 0, opacity: 1, transition },
        exit: { x: -100, opacity: 0, transition },
      };
    case "slide-top":
      return {
        hidden: { y: -100, opacity: 0 },
        visible: { y: 0, opacity: 1, transition },
        exit: { y: -100, opacity: 0, transition },
      };
    case "slide-bottom":
      return {
        hidden: { y: 100, opacity: 0 },
        visible: { y: 0, opacity: 1, transition },
        exit: { y: 100, opacity: 0, transition },
      };
    default:
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition },
        exit: { opacity: 0, transition },
      };
  }
};

const AnimatedDiv = ({
  children,
  animationType = "fade",
  duration = 0.6,
  delay = 0,
  className = "",
  style = {},
  inViewport = false,
  once = true,
  margin = "-40px 0px", // viewport margin for triggering animation
}: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: margin });

  const shouldAnimate = inViewport ? isInView : true;
  const variants = getVariants(animationType, duration, delay);

  return (
    <AnimatePresence>
      {shouldAnimate && (
        <motion.div
          ref={ref}
          className={`will-change-transform will-change-opacity ${className}`} // Tailwind optimization
          style={style}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedDiv;
