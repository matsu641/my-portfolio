export const projectSlugs = [
  "chest-xray",
  "employee-attrition",
  "gis-map",
  "rush-hour",
  "clinic-inventory",
  "clinic-website",
] as const;

export type ProjectSlug = (typeof projectSlugs)[number];

export const projectSlugSet = new Set<string>(projectSlugs);
