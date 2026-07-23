export type PortfolioVariant = "default" | "ai" | "swe";

export const projectIndicesByVariant: Record<PortfolioVariant, number[] | null> = {
  default: [
    5,
    // 2, // AI Document Review (temporarily hidden)
    3,
    0,
    // 6, // Clinic Reservation Management System (temporarily hidden)
    7,
    1,
    4,
    8,
  ],
  ai: [
    0,
    1,
    // 2, // AI Document Review (temporarily hidden)
  ],
  swe: [
    // 2, // AI Document Review (temporarily hidden)
    3,
    4,
    5,
    // 6, // Clinic Reservation Management System (temporarily hidden)
    7,
  ],
};

export const experienceKeysByVariant: Record<
  PortfolioVariant,
  Array<"equos" | "starup" | "freelance" | "utjn">
> = {
  default: ["equos", "starup", "freelance", "utjn"],
  ai: ["equos"],
  swe: ["starup", "freelance", "utjn"],
};

export function getVariantBasePath(variant: PortfolioVariant) {
  return variant === "default" ? "" : `/${variant}`;
}
