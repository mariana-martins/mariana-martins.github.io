import React from "react";

import aboutMeImageDark from "@/assets/darkAvatar.png";
import aboutMeImageLight from "@/assets/lightAvatar.png";
import { useTheme } from "@/hooks/useTheme";

function FunnyLabel({
  className = "",
  theme,
}: {
  className?: string;
  theme: "light" | "dark";
}): React.JSX.Element {
  const color =
    theme === "light" ? "var(--color-blue-200)" : "var(--color-warm-50)";

  return (
    <svg
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      role="presentation"
    >
      <style>
        {`
          .handwritten-text {
            font-family: var(--font-family-heading);
            font-size: 24px;
            fill: ${color};
          }
        `}
      </style>

      {/* Text Group */}
      <text x="70" y="0" className="handwritten-text" textAnchor="start">
        Hello! I&apos;m Mari, and
      </text>
      <text x="70" y="30" className="handwritten-text" textAnchor="start">
        this is my dog,
      </text>
      <text x="70" y="60" className="handwritten-text" textAnchor="start">
        Margot!
      </text>

      {/* The Arrow Path */}
      <path
        d="M 40 40
           C 10 100, 40 160, 90 140
           C 140 120, 120 70, 90 90
           C 70 105, 110 150, 180 160"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Arrowhead */}
      <path
        d="M 160 145 L 180 160 L 165 175"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProfileImage(): React.JSX.Element {
  const { theme } = useTheme();
  const aboutMeImage = theme === "dark" ? aboutMeImageDark : aboutMeImageLight;

  return (
    <figure className="md:col-2 relative place-self-center text-text-primary dark:text-text-primary-dark  w-full md:mx-8">
      <img
        src={aboutMeImage}
        alt="Me and my dog, Margot"
        className="h-full object-cover max-h-50 justify-self-center"
      />
      <FunnyLabel
        className="absolute bottom-20 right-40 md:left-10 md:right-0 w-34 h-34"
        theme={theme}
      />
    </figure>
  );
}

export default ProfileImage;
