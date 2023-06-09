/**
 * WARNING: DO NOT USE ANY TWIND FUNCTIONS in here otherwise the
 * vscode-twind-intellisense plugin may stop working. To overcome
 * this issue, use animations and keyframes intead of twind's animation
 * function.
 */
import type { Options } from "$fresh/plugins/twind.ts";

const gridCols = ([arg]: string[]) => {
  const template = Number.isInteger(Number(arg))
    ? `repeat(${arg}, minmax(0, 1fr))`
    : arg
    ? arg.replace(/(^\[)|(\])$/g, "").replace(/_/g, " ")
    : arg;

  return {
    "grid-template-columns": template,
  };
};

const gridRows = ([arg]: string[]) => {
  const template = Number.isInteger(Number(arg))
    ? `repeat(${arg}, minmax(0, 1fr))`
    : arg
    ? arg.replace(/(^\[)|(\])$/g, "").replace(/_/g, " ")
    : arg;

  return {
    "grid-template-rows": template,
  };
};

const options: Omit<Options, "selfURL"> = {
  theme: {
    extend: {
      colors: {
        "default": "#FFFFFF",
        "header": "#FFFFFF",
        "badge": "#8C3D3D", // shopping cart tem isso tambem
        "footer": "#003232",
        "interactive": "#161616",
        "interactive-inverse": "#FFFFFF",
        "hover": "rgba(0, 0, 0, 0.04)",
        "hover-inverse": "rgba(255, 255, 255, 0.4)",
        "primaryBlue": "#43BfD3",
        "secondaryBlue": "#318AC4",
        "greenButton": "#27AF95",
        "greenButtonHover": "#2D9A85",
        "primaryColorHeading": "#318ac4",
        "secondaryColorHeading": "#215C83",
        "priceColor": "#43BFD3",
        "lightGray": "#9E9E9E",
        "secondaryTextColor": "#616161",
        "pinkFlagColor": "#E30B79",
        "blueFlag": "#3F69FF",
        "yellowModal": "#FFDB00",
        "orangeTooltip": "#ED9936",
        "orangeButton": "#FFB400",
        "grayEditoras": "#fcfcfc",
      },
      textColor: {
        "default": "#161616",
        "default-inverse": "#FFFFFF",
        "subdued": "#66736C",
        "subdued-inverse": "#C6C6C6",
        "price": "#8C3D3D",
        "section-title": "#161616",
        "positive": "#1A7346",
        "critical": "#B44125",
        "primaryBlue": "#43BfD3",
        "secondaryBlue": "#318AC4",
        "greenButton": "#27AF95",
        "greenButtonHover": "#2D9A85",
        "primaryColorHeading": "#318ac4",
        "secondaryColorHeading": "#215C83",
        "priceColor": "#43BFD3",
        "lightGray": "#9E9E9E",
        "secondaryTextColor": "#616161",
        "thirdTextColor": "#424242",
        "pinkFlagColor": "#E30B79",
        "blueFlag": "#3F69FF",
        "yellowModal": "#FFDB00",
        "orangeTooltip": "#ED9936",
        "lightMenuGray": "#8a8a8a",
      },
      borderColor: {
        "default": "#D4DBD7",
        "default-inverse": "#FFFFFF",
        "interactive": "#161616",
        "focus": "#3379EF",
        "positive": "#1A7346",
        "critical": "#B44125",
        "primaryBlue": "#43BfD3",
        "secondaryBlue": "#318AC4",
        "greenButton": "#27AF95",
        "greenButtonHover": "#2D9A85",
        "primaryColorHeading": "#318ac4",
        "secondaryColorHeading": "#215C83",
        "priceColor": "#43BFD3",
        "lightGray": "#9E9E9E",
        "secondaryTextColor": "#616161",
        "pinkFlagColor": "#E30B79",
        "blueFlag": "#3F69FF",
        "yellowModal": "#FFDB00",
        "orangeTooltip": "#ED9936",
        "borderProduct": "#c9c9c9",
      },
      outline: {
        interactive: ["2px solid #3379EF", "2px"],
      },
      fontSize: {
        "heading-1": ["42px", "67.2px"],
        "heading-2": ["14px", "14px"],
        "heading-3": ["20px", "24px"],
        "menu": ["11px", "11px"],
        "button": ["14px", "18px"],
        "body": ["16px", "20px"],
        "caption": ["13px", "16px"],
        "list-price": ["10px", "20px"],
        "xs": ["10px", "14px"],
        "sm": ["12px", "16px"],
        "md": ["14px", "20px"],
        "base": ["16px", "24px"],
      },
      fontWeight: {
        "heading-1": "500",
        "heading-2": "500",
        "heading-3": "500",
        "menu": "400",
        "button": "700",
        "medium": "600",
        "body": "400",
        "caption": "400",
        "list-price": "400",
        "extraBold": "900",
      },
      animation: {
        "slide-left": "slide-left-frame 0.4s ease normal",
        "slide-right": "slide-right-frame 0.4s ease normal",
        "slide-bottom": "slide-bottom-frame 0.4s ease normal",
      },
      keyframes: {
        "slide-left-frame": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-right-frame": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-bottom-frame": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
      },
      boxShadow: {
        sm: "0px 1px 3px 0px #00000014",
        default: "0px 1px 4px 0px #0000001F",
        md: "0px 1px 5px 0px #00000024",
        lg: "0px 4px 10px 0px #0000001F",
      },
    },
    fontFamily: {
      sans: ["Lato", "sans-serif"],
      serif: ["inherit", "serif"],
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  preflight: (preflight) => ({
    ...preflight,

    // Stick footer to the bottom of the page
    body: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
    },
    'section[data-manifest-key="./sections/Footer.tsx"]': {
      marginTop: "auto",
    },

    // Prevent scroll when modal is open
    "body[no-scroll]": {
      overflow: "hidden",
      height: "100vh",
    },
  }),
  plugins: {
    backdrop: {
      "&::backdrop": {
        background: "rgba(0, 0, 0, 0.5)",
      },
    },
    "scroll-snap-center": {
      "scroll-snap-align": "center",
    },
    "scroll-x-mandatory": {
      "scroll-snap-type": "x mandatory",
    },
    "snap-x": {
      "scroll-snap-type": "x var(--tw-scroll-snap-strictness)",
    },
    "snap-mandatory": {
      "--tw-scroll-snap-strictness": "mandatory",
    },
    "fill": (parts) => ({ "fill": parts.join("-") }),
    "max-h-min": {
      "max-height": "min-content",
    },
    "snap": ([mod]) => ({ "scroll-snap-align": mod }),
    "grid-cols": gridCols,
    "grid-rows": gridRows,
    "scroll-smooth": {
      "scroll-behavior": "smooth",
      "-webkit-overflow-scrolling": "touch",
    },
    "scrollbar-none": {
      "scrollbar-width": "none",
      "-ms-overflow-style": "none",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
    "scrollbar-color": {
      "&::-webkit-scrollbar-thumb": {
        "background": "#318ac4",
        "border-radius": "4px",
      },
      "&::-webkit-scrollbar": {
        "width": "9px",
      },
      "&::-webkit-scrollbar-track": {
        "opacity": ".3",
        "background-color": "#ECF2F6",
        "border": "4px solid transparent",
        "background-clip": "content-box",
      },
    },
    "scrollbar-horizontal-min": {
      "&::-webkit-scrollbar-thumb": {
        "background-color": "#318ac4",
        "border-radius": "4px",
      },
      "&::-webkit-scrollbar": {
        "width": "6px",
        "height": "6px",
        "background-color": "#F5F5F5",
      },
      "&::-webkit-scrollbar-track": {
        "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.3)",
        "background-color": "#F5F5F5",
      },
    },
    "mix-blend-multiply": {
      "mix-blend-mode": "multiply",
    },
    "bg-blend-multiply": {
      "background-blend-mode": "multiply",
    },
    "absolute-center": {
      transform: "translateX(-50%)",
      left: "50%",
    }
  },
};

export default options;
