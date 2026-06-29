export type PortfolioVariant = "default" | "ai" | "swe";

export const projectIndicesByVariant: Record<PortfolioVariant, number[] | null> = {
  default: null,
  ai: [0, 1],
  swe: [2, 3, 4, 5],
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
