import { FilterNameTYpe } from "@/TypeDef";
import { useListSearchConditionState } from "@/components/store/useListSearchConditionState";
import { useUserFilter } from "@/components/usecase/useUserFilter";

type Props = {
  filterItemName: FilterNameTYpe;
};

export const useFilterItemHooks = ({ filterItemName }: Props) => {
  const condition = useListSearchConditionState();

  const { userFilterData, hasError, isLoading } = useUserFilter(
    filterItemName,
    condition
  );

  return { userFilterData, hasError, isLoading };
};
