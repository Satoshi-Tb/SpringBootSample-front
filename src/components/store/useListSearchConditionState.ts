import { SearchCondition } from "@/TypeDef";
import React from "react";
import { useRecoilValue, useSetRecoilState, atom } from "recoil";

const listSearchConditionState = atom<SearchCondition>({
  key: "listSearchConditionState",
  default: {
    userId: "",
    userName: "",
    gender: "",
    departmentId: "",
    ageFrom: undefined,
    ageTo: undefined,
    page: 0,
    size: 10,
  },
});

export const useListSearchConditionState = () => {
  return useRecoilValue(listSearchConditionState);
};

export const useListSearchConditionMutators = () => {
  const setState = useSetRecoilState(listSearchConditionState);

  const setListSearchCondition = React.useCallback(
    (condition: SearchCondition) => setState(condition),
    [setState]
  );

  return { setListSearchCondition };
};
