import { Variants } from "framer-motion";

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" }
  }
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.25, ease: "easeOut" }
  }
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04
    }
  }
};

export const buttonTapHover = {
  whileHover: { scale: 1.02, transition: { duration: 0.15 } },
  whileTap: { scale: 0.97, transition: { duration: 0.1 } }
};

export const cardHover = {
  whileHover: { y: -4, transition: { duration: 0.25, ease: "easeOut" } }
};
