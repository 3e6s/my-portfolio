import localFont from "next/font/local";

export const saudiFont = localFont({
  src: [
    {
      path: "./fonts/Saudi-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Saudi-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-saudi",
  display: "swap",
});

export const ibmPlexArabic = localFont({
  src: [
    {
      path: "./fonts/IBMPlexSansArabic-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/IBMPlexSansArabic-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/IBMPlexSansArabic-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/IBMPlexSansArabic-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/IBMPlexSansArabic-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/IBMPlexSansArabic-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-ibm",
  display: "swap",
});