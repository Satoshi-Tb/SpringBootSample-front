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

  const createItemId = (filter: FilterItem) =>
    filterItemName === "age"
      ? `${filterItemName}.${filter.filterRangeValue?.from}`
      : `${filterItemName}.${filter.filterValue}`;

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
      case "age":
        if (toggleFilter) {
          newCond.ageFrom = filter.filterRangeValue!.from;
          newCond.ageTo = filter.filterRangeValue!.to;
        } else {
          delete newCond.ageFrom;
          delete newCond.ageTo;
        }
        break;
      default:
        break;
    }
    setListSearchCondition(newCond);
  };
  return { onFilterClick, filterOn, createItemId };
};
