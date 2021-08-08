export const createId = (base: string, extension: string) => {
  return `${base}-${extension}`;
};

export const joinIds = (
  ...ids: (string | null | undefined | false)[]
): string => {
  return ids.filter((id): id is string => !!id).join(" ");
};
