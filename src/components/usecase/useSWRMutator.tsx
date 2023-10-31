import { useSWRConfig } from "swr";

export const useSWRMutator = () => {
  const { mutate } = useSWRConfig();
  return { mutate };
};
