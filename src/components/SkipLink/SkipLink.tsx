import React, { useCallback, useEffect, useRef } from "react";

import { ArrowDown } from "lucide-react";

interface SkipLinkProps {
  targetId: string;
  label?: string;
}

const skipLinkClasses = [
  // Positioning and layout
  "absolute left-0 top-0 z-50",
  // Visibility - hidden by default, visible on focus
  "sr-only focus:not-sr-only",
  // Transform and transitions
  "-translate-y-full transition-all focus:translate-y-0",
  // Styling - padding only applies when visible (on focus)
  "rounded-xs outline-none focus:mt-6 focus:px-4 focus:py-2 text-md",
  // Focus ring
  "focus:ring-2 focus:ring-offset-2",
  // Light theme colors
  "bg-warm-100 text-text-primary",
  "focus:ring-[var(--color-pink)]",
  "hover:bg-warm-100/80",
  // Dark theme colors
  "dark:bg-[var(--color-blue-100)] dark:text-[var(--color-blue-200)]",
  "dark:focus:ring-[var(--color-blue-100)]",
  "dark:hover:bg-[var(--color-blue-100)]/90",
].join(" ");

function SkipLink({
  targetId,
  label = "Skip to main content",
}: SkipLinkProps): React.JSX.Element {
  const targetElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    targetElementRef.current = document.querySelector(`#${targetId}`);
  }, [targetId]);

  const handleSkip = useCallback(
    (
      event:
        | React.MouseEvent<HTMLAnchorElement>
        | React.KeyboardEvent<HTMLAnchorElement>,
    ): void => {
      event.preventDefault();
      if (targetElementRef.current !== null) {
        targetElementRef.current.focus();
        targetElementRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    },
    [],
  );

  return (
    <a
      href={`#${targetId}`}
      onClick={handleSkip}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleSkip(event);
        }
      }}
      className={skipLinkClasses}
    >
      <span className="flex items-center gap-2">
        <ArrowDown />
        {label}
      </span>
    </a>
  );
}

export default SkipLink;
