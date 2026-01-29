/* eslint-disable */
import React from "react";

export const motion = new Proxy(
  {},
  {
    get: (target, prop) => {
      // If accessing a specific component like motion.div, motion.h1, etc.
      return React.forwardRef(({ children, ...props }, ref) => {
        // Filter out motion-specific props
        const {
          whileHover,
          whileTap,
          whileDrag,
          whileFocus,
          whileInView,
          layout,
          layoutId,
          initial,
          animate,
          exit,
          transition,
          variants,
          style,
          onAnimationStart,
          onAnimationComplete,
          onUpdate,
          onDrag,
          onDragStart,
          onDragEnd,
          ...validProps
        } = props;

        // Determine the HTML tag to use
        // If valid tag name in prop, use it. Otherwise default to div
        const Component = prop;

        return React.createElement(
          Component || "div",
          { ...validProps, ref },
          children,
        );
      });
    },
  },
);

export const MotionConfig = ({ children }) => children;
export const AnimatePresence = ({ children }) => children;

// Hooks
export const useReducedMotion = () => false;
export const useAnimation = () => ({ start: jest.fn() });
export const usePresence = () => [true, jest.fn()];
export const useIsPresent = () => true;
export const useCycle = (items) => [items[0], jest.fn()];
export const useScroll = () => ({ scrollX: 0, scrollY: 0 });
export const useSpring = () => 0;
export const useTransform = () => 0;
export const useVelocity = () => 0;
export const useElementScroll = () => ({ scrollY: 0 });
export const useViewportScroll = () => ({ scrollY: 0 });
