import { FilterItem } from "@/TypeDef";
import {
  useListSearchConditionMutators,
  useListSearchConditionState,
} from "@/components/store/useListSearchConditionState";
import { useState } from "react";

type Props = {
  filterItemName: string;
};

export const useFilterElementsHooks = ({ filterItemName }: Props) => {
  const [filterOn, setFilterOn] = useState<boolean>(false);
  const { setListSearchCondition } = useListSearchConditionMutators();
  const condition = useListSearchConditionState();

  const onFilterClick = (filter: FilterItem) => {
    const toggleFilter = !filterOn;

    setFilterOn(toggleFilter);
    const newCond = { ...condition };
    switch (filterItemName) {
      case "departmentId":
      case "gender":
        newCond[filterItemName] = toggleFilter ? filter.filterValue : "";
        break;
      case "userId":
      case "userName":
        newCond[filterItemName] = toggleFilter ? filter.filterValue : "";
        break;
      default:
        break;
    }
    setListSearchCondition(newCond);
  };
  return { onFilterClick, filterOn };
};
